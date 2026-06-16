import { useState, useEffect, useRef } from 'react';
import {
  Upload, FileText, Image as ImageIcon, Download,
  X, CheckCircle2, AlertCircle, Loader2, Paperclip,
} from 'lucide-react';
import { supabase, isConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const BUCKET = 'course-materials';
const MAX_MB = 20;
const MAX_BYTES = MAX_MB * 1024 * 1024;
const ALLOWED_EXT = new Set([
  'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx',
  'txt', 'png', 'jpg', 'jpeg', 'gif', 'zip',
]);

function fmtSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
  return new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
}

function ext(name) {
  return (name ?? '').split('.').pop().toLowerCase();
}

function FileIcon({ type, className }) {
  const imgTypes = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
  if (imgTypes.includes(type)) return <ImageIcon className={className} />;
  return <FileText className={className} />;
}

// Build the download link from the storage path, never from a stored URL —
// a DB row's file_url could be tampered with to point anywhere (or be a
// javascript: URL), while a bucket path can only resolve inside our bucket.
function materialUrl(filePath) {
  if (!filePath) return null;
  return supabase.storage.from(BUCKET).getPublicUrl(filePath).data.publicUrl;
}

export default function CourseMaterials({ courseCode, courseSlug }) {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [fetching, setFetching] = useState(isConfigured);
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    if (!isConfigured) return;
    load();
  }, [courseSlug]);

  async function load() {
    const { data } = await supabase
      .from('course_materials')
      .select('id, display_name, file_path, file_size, file_type, description, uploaded_at')
      .eq('course_slug', courseSlug)
      .order('uploaded_at', { ascending: false });
    setMaterials(data ?? []);
    setFetching(false);
  }

  function handleFilePick(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setError('');
    const fileExt = ext(f.name);
    if (!ALLOWED_EXT.has(fileExt)) {
      setError(`File type .${fileExt} is not allowed. Use PDF, DOC, PPT, images, or ZIP.`);
      return;
    }
    if (f.size > MAX_BYTES) {
      setError(`File is too large. Maximum is ${MAX_MB} MB.`);
      return;
    }
    setFile(f);
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!user) { setError('Please sign in to upload.'); return; }
    if (!file) { setError('Please select a file.'); return; }
    setUploading(true);
    setError('');

    try {
      const fileExt = ext(file.name);
      const path = `${courseSlug}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: storageErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type });
      if (storageErr) throw storageErr;

      // Extract text so the AI Tutor can reference this material as lecture notes.
      // Failure is non-fatal — the upload completes even if extraction fails.
      let extracted_text = null;
      if (['txt', 'docx', 'pdf'].includes(fileExt)) {
        try {
          const exRes = await fetch('/api/extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filePath: path, fileType: fileExt }),
          });
          if (exRes.ok) {
            const exData = await exRes.json();
            extracted_text = exData.text ?? null;
          }
        } catch {
          // extraction failure is silent — material still uploads
        }
      }

      const { error: dbErr } = await supabase.from('course_materials').insert({
        course_code: courseCode,
        course_slug: courseSlug,
        display_name: file.name,
        file_path: path,
        file_size: file.size,
        file_type: fileExt,
        description: desc.trim() || null,
        uploaded_by: user.id,
        extracted_text,
      });
      if (dbErr) throw dbErr;

      setDone(true);
      setFile(null);
      setDesc('');
      setShowForm(false);
      setTimeout(() => setDone(false), 5000);
      load();
    } catch (err) {
      setError(err?.message ?? 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  function closeForm() {
    setShowForm(false);
    setFile(null);
    setDesc('');
    setError('');
  }

  /* ── Not configured ─────────────────────────────────────────────── */
  if (!isConfigured) {
    return (
      <div className="bg-cream border border-dashed border-coffee-300 rounded-xl p-6 flex items-start gap-4">
        <div className="w-9 h-9 rounded-lg bg-coffee-100 flex items-center justify-center shrink-0 mt-0.5">
          <Paperclip size={18} className="text-coffee-500" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display font-bold text-ink">Student Materials</h2>
            <span className="text-xs font-mono px-2 py-0.5 bg-coffee-100 text-coffee-600 rounded-full">Setup required</span>
          </div>
          <p className="text-sm text-coffee-700 leading-relaxed">
            Add{' '}
            <code className="font-mono text-xs bg-coffee-100 px-1 rounded">VITE_SUPABASE_URL</code>
            {' '}and{' '}
            <code className="font-mono text-xs bg-coffee-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code>
            {' '}to your environment variables to enable student file uploads.
          </p>
        </div>
      </div>
    );
  }

  /* ── Configured ─────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">

      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display font-bold text-ink flex items-center gap-2">
            <Paperclip size={16} className="text-coffee-700" />
            Student Materials
          </h2>
          {!fetching && (
            <p className="text-xs text-coffee-600 mt-0.5">
              {materials.length === 0
                ? 'No materials uploaded yet'
                : `${materials.length} material${materials.length !== 1 ? 's' : ''} shared by students`}
            </p>
          )}
        </div>
        {!showForm && (
          user ? (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-cream transition-colors hover:bg-ink/90 sm:self-start"
            >
              <Upload size={13} />
              Upload
            </button>
          ) : (
            <p className="text-xs text-coffee-600 sm:self-center">
              Sign in (top right) to upload materials
            </p>
          )
        )}
      </div>

      {/* Success banner */}
      {done && (
        <div className="flex items-center gap-2 px-4 py-3 bg-moss/10 border border-moss/20 rounded-lg text-sm text-moss font-medium">
          <CheckCircle2 size={15} />
          Material uploaded and now visible to all students in {courseCode}.
        </div>
      )}

      {/* Upload form */}
      {showForm && (
        <form onSubmit={handleUpload} className="bg-paper border border-coffee-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-ink text-sm">Upload a Material</h3>
            <button
              type="button"
              onClick={closeForm}
              className="text-coffee-400 hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* File picker */}
          {!file ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-coffee-200 hover:border-coffee-400 rounded-xl p-8 text-center transition-colors group"
            >
              <Upload size={26} className="mx-auto mb-2 text-coffee-300 group-hover:text-coffee-600 transition-colors" />
              <p className="text-sm font-medium text-coffee-700 group-hover:text-ink transition-colors">
                Click to select a file
              </p>
              <p className="text-xs text-coffee-600 mt-1">
                PDF, DOC, PPT, XLS, images, ZIP · Max {MAX_MB} MB
              </p>
            </button>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 bg-coffee-50 border border-coffee-200 rounded-xl">
              <FileText size={18} className="text-coffee-700 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink truncate">{file.name}</p>
                <p className="text-xs text-coffee-600">{fmtSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-coffee-400 hover:text-ink transition-colors shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            className="sr-only"
            onChange={handleFilePick}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.png,.jpg,.jpeg,.gif,.zip"
          />

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-coffee-700 mb-1.5">
              Description{' '}
              <span className="text-coffee-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder={`e.g. Week 5 lecture notes on ${courseCode} — covers exam topics`}
              maxLength={200}
              rows={2}
              className="w-full px-3 py-2 text-sm bg-cream border border-coffee-200 rounded-lg text-ink placeholder:text-coffee-400 focus:outline-none focus:border-coffee-400 resize-none"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-rust">
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading || !file}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-ink text-cream text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <Upload size={14} />
                Upload to {courseCode}
              </>
            )}
          </button>
        </form>
      )}

      {/* Materials list */}
      {fetching ? (
        <div className="space-y-3">
          {[0, 1].map(i => (
            <div key={i} className="bg-paper border border-coffee-100 rounded-xl p-4 animate-pulse">
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-coffee-100 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 bg-coffee-100 rounded w-2/3" />
                  <div className="h-2.5 bg-coffee-50 rounded w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : materials.length === 0 && !showForm ? (
        <div className="text-center py-14">
          <Paperclip size={32} className="mx-auto mb-3 text-coffee-200" />
          <p className="font-display font-bold text-ink mb-1">No materials yet</p>
          <p className="text-sm text-coffee-600 mb-5">
            Be the first to share a resource for {courseCode}.
          </p>
          {user ? (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 border border-coffee-300 rounded-lg text-coffee-700 hover:border-ink hover:text-ink transition-colors"
            >
              <Upload size={13} />
              Upload a material
            </button>
          ) : (
            <p className="text-xs text-coffee-600">Sign in (top right) to upload materials.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {materials.map(m => (
            <div
              key={m.id}
              className="group flex flex-col gap-3 rounded-xl border border-coffee-200 bg-paper p-4 transition-colors hover:border-coffee-300 sm:flex-row sm:items-start"
            >
              <div className="w-9 h-9 rounded-lg bg-coffee-100 flex items-center justify-center shrink-0 mt-0.5">
                <FileIcon type={m.file_type} className="w-4 h-4 text-coffee-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink text-sm leading-snug truncate">{m.display_name}</p>
                {m.description && (
                  <p className="text-xs text-coffee-600 mt-0.5 leading-relaxed line-clamp-2">
                    {m.description}
                  </p>
                )}
                <p className="text-xs text-coffee-600 mt-1 font-mono">
                  {m.file_type?.toUpperCase()}
                  {m.file_size ? ` · ${fmtSize(m.file_size)}` : ''}
                  {' · '}{timeAgo(m.uploaded_at)}
                </p>
              </div>

              <a
                href={materialUrl(m.file_path)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 self-start rounded-lg border border-coffee-200 px-3 py-1.5 text-xs font-medium text-coffee-700 transition-all opacity-100 hover:border-ink hover:text-ink sm:self-auto sm:opacity-0 sm:group-hover:opacity-100"
              >
                <Download size={11} />
                Open
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
