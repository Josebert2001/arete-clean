// Resolves to { lat, lng }, never rejects: no geolocation support, a denied
// permission, and a timeout all resolve to nulls so the caller can proceed
// without coordinates rather than handle a rejected promise.
export function getLocation(options = {}) {
  const { timeout = 5000, maximumAge = 60000 } = options;
  return new Promise(resolve => {
    if (!navigator.geolocation) return resolve({ lat: null, lng: null });
    navigator.geolocation.getCurrentPosition(
      p => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => resolve({ lat: null, lng: null }),
      { timeout, maximumAge },
    );
  });
}
