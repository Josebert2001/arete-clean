// PHY 128 — General Practical Physics II
// Lecture notes transcribed from the departmental practical manual
// ("First Year University Physics Practical Manual (Light, Sound, Electricity
// and Magnetism), Volume 2", Physics Writers Series Creation).
//
// COVERAGE: Section 1 of the manual in full — the four theoretical-background
// chapters a student is expected to have read before walking into the lab:
//   Chapter 1  General Introduction & Useful Hints to Students   p.1
//   Chapter 2  Geometrical Optics (Theoretical Background)       p.4
//   Chapter 3  Sound Waves (Theoretical Background)              p.10
//   Chapter 4  Electricity and Magnetism (Theoretical Background) p.15
// Section 2 (the experiments themselves, pp.31–98) is not transcribed here.
//
// STRUCTURE: one topic per manual chapter, so topic N is always Chapter N and
// the chapter's numbered sections (2.1, 2.2, …) are headings inside it. The
// manual's own equation numbers (2.1, 3.4, 4.15, …) are preserved as captions
// so a student can cross-reference the printed copy.
//
// Which syllabus items each chapter reaches is NOT recorded here. This file is
// imported by every department that takes PHY 128, and each department writes
// its own `topics` array, so a single set of indices cannot be right for all of
// them. The mapping lives on each course instead, as `noteCoverage` keyed by
// the chapter numbers above (see courses.js / dataScienceCourses.js).
//
// Maths is written as LaTeX: $...$ for inline expressions, and `math` sections
// for display equations. Rendered by KaTeX — see src/components/MathText.jsx.
//
// FIGURES. The manual's diagrams were extracted from the source document,
// cropped to the diagram (the scans are page regions, so each carried a band of
// surrounding body text and some reverse-page bleed-through) and converted by
// scripts/optimize-lecture-images.mjs. They live in public/lecture-notes/phy-128/.
// Each figure keeps the printed caption inside the image, so the `caption` prop
// says what the figure shows rather than repeating its number.
//
// Fig 2.2 (converging/concave mirror) is missing. It is clipped in the source
// document itself — the scan begins below the top of the ray diagram, leaving
// only the mirror arc and one ray — so there is no crop that recovers it. A
// `note` section stands in its place.
//
// ERRATA. The printed manual carries five genuine errors, all corrected here
// with a `note` section beside each so a student reading the printed copy is
// not confused:
//   * p.11 worked example (ii) — the manual squares the tension, giving
//     $m = 0.09\,$kg m⁻¹. Carrying $T$ once gives $8.65 \times 10^{-4}$ kg m⁻¹.
//   * p.12 worked example (iii) — compounds the error above with $\ell = 0.32$
//     for its own $\ell = 0.34$, and then states a result (936.4 N) that does
//     not follow from either. The intended answer is 900 N.
//   * p.19 equation 4.10 — gives the internal resistance of $n$ cells in
//     parallel as $n/r$; it is $r/n$, as the manual's own "To Note" says four
//     paragraphs later.
//   * p.8 §2.4 — "angle of refraction, $r = 890°$" is a garbled $90°$.
//   * p.8 §2.3 — "equation 5.8" is equation 2.8; there is no Chapter 5.
// The manual also has cross-reference slips that change no physics (figure 7.3
// for 4.3, figure 7.10 for 4.10, Figure 4.4 for 4.5 in §4.5, Figure 4.3 for
// 4.11 under Electrical Heating) and scanning damage to a few words ("curs" for
// "cuts", "batterie.." for "batteries"). Those are silently right here.

const IMG = '/lecture-notes/phy-128';

export const phy128LectureNotes = [
  // ═══════════════════════════════════════════════════════════════
  {
    number: '1',
    title: 'Chapter One — General Introduction & Useful Hints to Students',
    sections: [
      {
        type: 'text',
        heading: '1.0 Introduction',
        text: 'Let us embark upon an exciting journey through the wonderful world of Physics. The fundamental laws of Physics ($F = ma$, for example) are deceptively simple just by looking at them. How then has it taken so many centuries to discover them? How do we know that these laws are really true? What kind of skills do we require to test these laws of physics? At the end of this laboratory course, you should be able to answer these questions, especially as it concerns the basic physics laws which are involved in this first year of your scientific career.',
      },
      {
        type: 'text',
        text: 'In addition to the specific goals of the individual experiments you will perform during this course, there are two general goals. First, you will have first-hand experience with the basic concepts of physics. The second goal is to teach you how to make and interpret measurements of physical phenomena. In addition, you will learn how to recognise and deal with the sources of error which are an inherent part of all experiments. The apparatus normally used in the laboratories is necessarily imperfect. These imperfections cause various spurious effects which we have to learn to cope with.',
      },

      {
        type: 'bullets',
        heading: '1.1 Helpful Hints',
        items: [
          '(a) During the laboratory session, you will be expected to think critically and try to understand what you want to do before doing it.',
          '(b) You must be consistent with the units of measurement when you perform the experiments and carry out the calculations. For example, if you are using kilograms (kg) for mass, then you must use metres (m) and newtons (N) as your units of length and force respectively. If you are using the gram (g) as your unit of mass, then use the centimetre (cm) and the dyne as your units of length and force. Mixing units is the most common type of calculation error in the laboratories.',
          '(c) Compare your results with those that are theoretically expected. If there are any major discrepancies, check to make sure you did your calculations and/or experiment correctly. Your answer must be physically reasonable. Do not merely put down your result — you must try to explain your result physically.',
          '(d) If you have problems during the laboratory session, ask the instructors to assist you.',
        ],
      },

      {
        type: 'text',
        heading: '1.2 Laboratory Notebook',
        text: 'A well-kept laboratory notebook is one of the most important tools in any research. Write down your observations, your description of the experiment and the apparatus, ideas that come to you as you work, conclusions you arrive at, and criticisms of your methods and ideas. The recordings must be done in pencil. When you are satisfied that you are correct, then and only then can you record in pen. At this point you have to make the necessary corrections when you are reporting the final results. Remember, your notebook should show that you understand what you have done in the laboratory. Thus, good discussion of the experiment, observations you have made, error analysis and the like are essential to getting a good grade out of this course.',
      },
      {
        type: 'bullets',
        heading: 'Rules for keeping the notebook',
        items: [
          '(a) Write the date at the top right corner of the notebook.',
          '(b) Enter all data into the notebook directly. Do not write on a piece of scrap paper.',
          '(c) Record the readings/measurements to the appropriate number of decimal places.',
          '(d) Indicate the appropriate units in all your results.',
          '(e) Before you do a calculation, indicate the equation you are using and write down all the steps of your calculation. This will assist your lecturer in grading.',
          '(f) Write the error involved, consistent with the accuracy of the instrument.',
          '(g) Always state the precautions you took while performing the experiment.',
          '(h) Repeat your readings as a precautionary measure.',
          '(i) To plot points on your graph, choose an appropriate scale. Scales such as 1 cm to represent 1, 2 or 5 units, or multiples of powers of ten (0.1, 0.2, 0.5, or 10, 20, 50, etc.) should be used.',
          '(j) Start your graph from the origin $(0,0)$ if an intercept is required; otherwise start from any convenient point.',
          '(k) Draw the best line through your points according to your judgment. The best curve must be smooth and may not pass through all the data points.',
          '(l) Ensure that the triangle used for calculating the slope of your graph is at least one-third of your whole graph in size.',
          '(m) Label all your work to indicate what topic the experiment is connected with.',
          '(n) Number your pages and leave a few pages at the beginning for a table of values.',
          '(o) When throwing out data points, note what you have done!',
        ],
      },

      {
        type: 'text',
        heading: '1.3 Data Presentation',
        text: 'Data will usually be presented in tabular or graphical form. If you are doing an experiment in which you take one measurement a number of times to improve your accuracy, record this in neat tabular form, clearly labelling what you are doing. If you are making measurements which are to be used in making a graph, record them in tabular form as $x$ vs $y$, and always put the units in the heading. If you draw a graph, clearly mark both axes with the parameters being presented, with units and scale factor, and label the graph such that a person could look at that one graph and know exactly what you had done. If you have any questions about your data presentation, do not hesitate to ask your instructor.',
      },
      {
        type: 'note',
        items: [
          'Rules (j) and (l) are the two that most often cost marks. Starting the axes away from the origin when the question asks for an intercept makes the intercept unreadable; a slope triangle smaller than a third of the graph makes the slope needlessly imprecise.',
          'Rule (o) — recording discarded points rather than quietly deleting them — is what separates a laboratory notebook from a fair copy. The discussion of *why* a point was rejected usually earns more credit than the point would have.',
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  {
    number: '2',
    title: 'Chapter Two — Geometrical Optics (Theoretical Background)',
    sections: [
      {
        type: 'text',
        heading: '2.0 Locating an image',
        text: 'Many experiments in geometrical optics require the location of the image of an object. The behaviour of lenses and mirrors towards light is shown most clearly if the object used is a white cardboard screen with a hole or slit in it, illuminated from behind by means of an electric light bulb. A similar vertical white cardboard can then be used for locating the real image of the illuminated object. A second, less visual method is to use a pin as the object and another pin (the image pin) to locate the image of the object pin — this is called the method of no-parallax. The advantage of this method is that because the very points of the pins are used as object and image, their position can be found with greater precision of measurement.',
      },
      {
        type: 'text',
        heading: 'Parallax',
        text: 'To understand parallax, put your two forefingers in front of one eye, one behind the other. The near finger cuts the more distant one and no separation between them can be seen. Now move the eye to the right, keeping the fingers still. You notice that there is a separation between the two fingers, and that the more distant finger is now on the right of the near finger. In general, the object that is farther from the eye always appears to move in the same direction as the eye, relative to the nearer object. This motion of one object relative to another is called parallax, and it is eliminated by making the object coincide with its image.',
      },
      {
        type: 'text',
        text: 'Finally, we use the "real is positive" convention to determine any of the following: object distance, image distance, focal length, magnification.',
      },
      {
        type: 'text',
        text: 'The scientific study of light and optical materials is useful in the making of spectacles, cameras, projectors, binoculars, microscopes and telescopes. The most important of all optical materials are the various kinds of glass. Others such as plastics, Polaroid, and synthetic and natural crystals have useful applications.',
      },
      {
        type: 'bullets',
        heading: 'What geometrical optics covers',
        items: [
          'A light wave normally spreads as it moves away from its source, but in this section we treat light as a form of energy which travels in straight lines called rays. A collection of rays is called a beam.',
          '(i) Rectilinear propagation — that is, straight-line travel.',
          '(ii) The laws of reflection.',
          '(iii) The laws of refraction.',
        ],
      },

      {
        type: 'definition',
        heading: '2.1 Reflection at Plane Surfaces',
        text: 'When light falls on a surface, it is partly reflected, partly transmitted and partly absorbed. For the reflected part, experiment shows that it is governed by two laws: (1) the angle of reflection equals the angle of incidence, $i_1 = i_2$; and (2) the reflected ray is in the same plane as the incident ray and the normal to the mirror at the point of incidence.',
      },
      {
        type: 'image',
        src: `${IMG}/01-reflection-laws.webp`,
        width: 1287, height: 731, maxWidth: 560,
        alt: 'An incident ray striking a plane mirror, with a dashed normal drawn at the point of incidence and the reflected ray leaving on the other side; the angles i₁ and i₂ are marked either side of the normal',
        caption: 'The two angles are measured from the normal, never from the mirror surface.',
      },

      {
        type: 'text',
        heading: '2.2 Curved Mirrors',
        text: 'Curved mirrors are used as car driving mirrors, and as reflectors in car headlamps, searchlights and flash lamps. There are two types of spherical mirror: concave (converging) and convex (diverging).',
      },
      {
        type: 'note',
        text: 'Fig 2.2, the converging/concave mirror, is clipped in the source document — the scan starts below the top of the ray diagram, so only the mirror arc and one ray survive. It is omitted rather than shown broken. The convex diagram below carries the same labelling (P, F, C), and the concave case is its mirror image: rays parallel to the principal axis converge on a *real* focus in front of the mirror instead of appearing to diverge from a virtual one behind it.',
      },
      {
        type: 'image',
        src: `${IMG}/03-convex-mirror.webp`,
        width: 1400, height: 871, maxWidth: 600,
        alt: 'Diverging or convex mirror: three rays parallel to the principal axis strike the mirror and reflect outwards, with dashed construction lines behind the mirror meeting at the virtual principal focus F; the pole P, focus F and centre of curvature C are marked along the axis',
        caption: 'The reflected rays diverge; the dashed construction lines behind the mirror locate the virtual focus F.',
      },
      {
        type: 'text',
        text: 'The geometric centre of the mirror is called the pole ($P$) of the mirror. The centre of the sphere of which the mirror is a part is called the centre of curvature ($C$). $CP$ is the radius of curvature $r$, while the line $CP$ produced is the principal axis. $F$ is the principal focus, and its distance from the centre of the mirror is the focal length $f$. The focal length of a spherical mirror is related to the radius of curvature by:',
      },
      { type: 'math', tex: 'f = \\frac{r}{2}', caption: 'Equation 2.1' },
      {
        type: 'text',
        text: 'When an object is placed at a distance $u$ from a mirror of focal length $f$, and the image is formed at distance $v$ from the mirror, then:',
      },
      { type: 'math', tex: '\\frac{1}{u} + \\frac{1}{v} = \\frac{1}{f}', caption: 'Equation 2.2' },
      {
        type: 'text',
        text: 'The linear magnification $m$ produced by a mirror is given by the relation:',
      },
      { type: 'math', tex: 'm = \\frac{\\text{Height of image}}{\\text{Height of object}}', caption: 'Equation 2.3' },
      {
        type: 'text',
        text: 'In terms of the object and image distances, we have that:',
      },
      { type: 'math', tex: 'm = \\frac{v}{u}', caption: 'Equation 2.4' },

      {
        type: 'definition',
        heading: 'Refraction and Snell\'s law',
        text: 'When light passes from one medium to another, the angle of incidence $i$ in the first medium is related to the angle of refraction $r$ in the second medium by Snell\'s law, $\\frac{\\sin i}{\\sin r} = n$, which is a constant, with $n$ the refractive index of the second medium with respect to the first.',
      },
      { type: 'math', tex: '\\frac{\\sin i}{\\sin r} = n', caption: 'Equation 2.5' },
      {
        type: 'image',
        src: `${IMG}/04-refraction-glass-block.webp`,
        width: 1092, height: 690, maxWidth: 600,
        alt: 'A ray PQ entering a rectangular glass block ABCD at point E, bending towards the normal inside the block with angle of refraction r, and emerging at R as ray RS parallel to the original direction but laterally displaced',
        caption: 'Fig 2.4a — refraction through a rectangular glass block. The emergent ray RS is parallel to the incident ray PQ, but shifted sideways.',
      },
      {
        type: 'text',
        text: 'The incident ray $PQ$ is laterally displaced and emerges as $RS$, such that the angle of incidence $i$ is equal to the angle of emergence $e$. The implication is that the incident ray emerges without deviation, but it is displaced.',
      },

      {
        type: 'text',
        heading: '2.3 Prisms',
        text: 'A ray of light passing through a triangular glass prism is shown below. $EFGH$ is a ray passing from air, through a prism of refracting angle $A$, and back to air again.',
      },
      {
        type: 'image',
        src: `${IMG}/05-prism-refraction.webp`,
        width: 1400, height: 833, maxWidth: 620,
        alt: 'A triangular prism ABC with a ray E entering at face F, refracting through the prism with internal angles r₁ and r₂, and emerging at G as ray H; the angle of deviation d is marked between the extended incident ray and the emergent ray',
        caption: 'The angle of deviation d is measured between the original direction of the ray and its final direction.',
      },
      { type: 'math', tex: 'd = (i - r_1) + (e - r_2)', caption: 'Equation 2.6 — the angle of deviation' },
      {
        type: 'text',
        text: 'Also $A = r_1 + r_2$, and $d$ varies with the angle of incidence $i$. The deviation has a minimum value $D$ for one particular angle of incidence. At this value the ray passes symmetrically through the prism, which implies that the angle of incidence equals the angle of emergence, $i = e$, and also $r_1 = r_2$. Thus $A = 2r$, and:',
      },
      { type: 'math', tex: 'i = \\frac{A + D}{2}', caption: 'Equation 2.7' },
      {
        type: 'image',
        src: `${IMG}/06-minimum-deviation-graph.webp`,
        width: 846, height: 600, maxWidth: 460,
        alt: 'A graph of angle of deviation d on the vertical axis against angle of incidence on the horizontal axis, forming a U-shaped curve with dashed lines dropped from the lowest point of the curve to both axes',
        caption: 'Deviation against angle of incidence. The curve has a single minimum — that value is D, and the manual leaves this figure unnumbered.',
      },
      {
        type: 'text',
        text: 'Since $n$ is the refractive index of the material of the prism, then $\\frac{\\sin i}{\\sin r} = n$, and:',
      },
      { type: 'math', tex: 'n = \\frac{\\sin\\!\\left(\\frac{A + D}{2}\\right)}{\\sin\\!\\left(\\frac{A}{2}\\right)}', caption: 'Equation 2.8' },
      {
        type: 'text',
        text: 'In conclusion, at minimum deviation equation 2.8 gives us the value of $n$.',
      },
      {
        type: 'note',
        text: 'The manual writes "equation 5.8" here. It means 2.8 — the manual has only four chapters in this section, and the expression referred to is the one directly above.',
      },

      {
        type: 'definition',
        heading: '2.4 Total Internal Reflection',
        text: 'The angle of incidence for which light coming from a denser medium towards a less dense medium produces grazing incidence (angle of refraction $r = 90°$) is called the critical angle $c$. Light incident at an angle greater than $c$ suffers total internal reflection.',
      },
      {
        type: 'image',
        src: `${IMG}/07-total-internal-reflection.webp`,
        width: 1400, height: 549, maxWidth: 660,
        alt: 'Left: a right-angled prism XYZ with a ray entering at Q, striking the hypotenuse at P at 45 degrees and being totally internally reflected downwards. Right: a ray inside a denser medium meeting the boundary at the critical angle c, with the refracted ray grazing along the surface at 90 degrees to the normal',
        caption: 'Left, Fig 2.7 — total internal reflection in a 45° prism. Right, Fig 2.7b — the critical angle, where the refracted ray just grazes the boundary.',
      },
      {
        type: 'text',
        text: 'For light travelling from glass (medium 1) to air (medium 2), applying Snell\'s law:',
      },
      { type: 'math', tex: 'n_1 \\sin i = n_2 \\sin r', caption: 'Equation 2.9' },
      {
        type: 'text',
        text: 'That is, $n_1 = n_2 \\frac{\\sin r}{\\sin i}$. For the critical case $r = 90°$, so $\\sin 90° = 1$; with $n_2 = 1$ for air and $i = c$, we obtain:',
      },
      { type: 'math', tex: 'n_1 = \\frac{1}{\\sin c}', caption: 'Equation 2.10' },
      {
        type: 'note',
        text: 'The printed manual gives the grazing condition as "$r = 890°$". That is scanning damage to $90°$ — the whole point of the critical angle is that the refracted ray runs along the boundary, at right angles to the normal.',
      },

      {
        type: 'text',
        heading: '2.5 Properties of Lenses',
        text: 'There are two types of lens, converging and diverging. The converging lens gives real images. Parallel rays, after refraction through a converging lens, converge at the principal focus $F$. The distance between $F$ and the lens is equal to the focal length $f$. You can easily obtain the approximate focal length of a lens by focusing the image of a distant object onto a screen: $f$ is then the distance between the screen and the lens.',
      },
      {
        type: 'text',
        text: 'The approximate focal length of a diverging lens can be found as follows. Focus the image of a distant object with combined converging and diverging lenses to obtain the focal length of the combination, $f_c$. If the focal length of the converging lens is $f_1$ and that of the diverging lens is $f_2$, it can be shown that:',
      },
      { type: 'math', tex: '\\frac{1}{f_c} = \\frac{1}{f_1} + \\frac{1}{f_2}' },
      {
        type: 'text',
        text: 'We can then calculate $f_2$, since the other quantities are known.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  {
    number: '3',
    title: 'Chapter Three — Sound Waves (Theoretical Background)',
    sections: [
      {
        type: 'text',
        heading: '3.1 Vibration of a Stretched String',
        text: 'When a stretched string such as those of a sonometer, guitar or violin is plucked, transverse waves are generated and propagated along the string. The speed of propagation is given by:',
      },
      { type: 'math', tex: 'v = \\sqrt{\\frac{T}{m}}', caption: 'Equation 3.1 — $T$ is the tension, $m$ the mass per unit length' },
      {
        type: 'text',
        text: 'Because the string is fixed at both ends, the waves reflect at the ends and the interference between the incident and reflected waves sets up stationary or standing waves. The fundamental mode of vibration has nodes at the fixed ends of the string and an antinode at the centre. This mode is usually obtained when the string is plucked at the middle.',
      },
      {
        type: 'image',
        src: `${IMG}/08-string-fundamental.webp`,
        width: 1400, height: 400, maxWidth: 620,
        alt: 'A string fixed between two blocks vibrating as a single loop, with the length ℓ marked by a double-headed arrow across the loop and the relation ℓ = λ/2 written beside it',
        caption: 'One loop between the fixed ends: the string length is half a wavelength.',
      },
      {
        type: 'text',
        text: 'Generally, the wave velocity is given by $v = \\lambda f$ (equation 3.2), where $f$ is the frequency of vibration, defined by $f = v/\\lambda$ (equation 3.3), and $\\lambda$ is the wavelength. For the fundamental vibration, $\\lambda = 2\\ell$. Hence:',
      },
      { type: 'math', tex: 'f = \\frac{1}{2\\ell}\\sqrt{\\frac{T}{m}}', caption: 'Equation 3.4' },
      {
        type: 'text',
        text: 'Writing the mass per unit length in terms of the wire\'s radius $r$ and the density $\\rho$ of its material, $m = \\pi r^2 \\rho$, so:',
      },
      { type: 'math', tex: 'f = \\frac{1}{2\\ell}\\sqrt{\\frac{T}{\\pi r^2 \\rho}}', caption: 'Equation 3.5' },
      {
        type: 'text',
        text: 'This frequency is known as the fundamental frequency, $f_0$. Higher frequencies which are integral multiples of the fundamental — $2f_0$, $3f_0$, $4f_0$, and so on — are known as harmonics or overtones. Each subsequent higher frequency adds a node to the previous number.',
      },
      {
        type: 'image',
        src: `${IMG}/09-string-second-harmonic.webp`,
        width: 1400, height: 320, maxWidth: 620,
        alt: 'A string fixed between two blocks vibrating as two loops with a node at the centre, the full length ℓ marked across both loops and the relation ℓ = λ written beside it',
        caption: 'The second harmonic: two loops, one extra node at the centre, and now ℓ = λ.',
      },
      {
        type: 'text',
        text: 'It follows from equation 3.4 that:',
      },
      { type: 'math', tex: 'f \\propto \\frac{1}{\\ell} \\;\\; (T, m \\text{ constant}) \\qquad f \\propto \\sqrt{T} \\;\\; (\\ell, m \\text{ constant}) \\qquad f \\propto \\frac{1}{\\sqrt{m}} \\;\\; (\\ell, T \\text{ constant})', caption: 'Equation 3.6' },

      {
        type: 'text',
        heading: 'Worked example — guitar string',
        text: 'A tension of 100 N was created in a guitar string to produce a fundamental note of 500 Hz. Calculate (i) the length of the string, (ii) the linear density of the string, and (iii) the tension that will produce the third harmonic in the instrument. Take $v = 340\\,\\text{ms}^{-1}$.',
      },
      {
        type: 'text',
        text: '(i) For a fundamental note on a string fixed at both ends, $\\lambda = 2\\ell$. From $v = \\lambda f$:',
      },
      { type: 'math', tex: '\\lambda = \\frac{v}{f} = \\frac{340\\,\\text{ms}^{-1}}{500\\,\\text{Hz}} = 0.68\\,\\text{m}' },
      { type: 'math', tex: '\\therefore \\ell = \\frac{\\lambda}{2} = \\frac{0.68}{2} = 0.34\\,\\text{m}' },
      {
        type: 'text',
        text: '(ii) Rearranging the fundamental frequency $f_0 = \\frac{1}{2\\ell}\\sqrt{T/m}$ for the linear density:',
      },
      { type: 'math', tex: 'm = \\frac{T}{4\\ell^2 f_0^{\\,2}} = \\frac{100}{4 \\times (0.34)^2 \\times (500)^2} = \\frac{100}{115600}' },
      { type: 'math', tex: '\\therefore m = 8.65 \\times 10^{-4}\\,\\text{kg m}^{-1}' },
      {
        type: 'text',
        text: '(iii) Since $f \\propto \\sqrt{T}$ for a string of fixed length and mass per unit length, raising the note from $f_0$ to the third harmonic $3f_0 = 1500\\,$Hz requires the tension to rise by a factor of $3^2$:',
      },
      { type: 'math', tex: 'T\' = 4\\ell^2 (3f_0)^2 m = 9T = 9 \\times 100 = 900\\,\\text{N}' },
      {
        type: 'note',
        items: [
          'Part (ii): the manual writes $100^2$ in the numerator and reaches $m = 0.09\\,$kg m⁻¹. The tension enters equation 3.4 once, not squared — carrying it once gives $8.65 \\times 10^{-4}$ kg m⁻¹. A linear density of 0.09 kg m⁻¹ would be a rope, not a guitar string.',
          'Part (iii): the manual carries the wrong $m$ forward, substitutes $\\ell = 0.32$ for its own answer of 0.34 from part (i), leaves $f_0$ un-tripled, and then states 936.4 N — a figure that does not follow from its own substitutions (they give 9216 N). The route above uses the proportionality directly, which is the point the question is testing.',
          'Read part (iii) as "what tension makes the fundamental equal to the old third-harmonic frequency". A string does not need a tension change to sound its third harmonic — you simply touch it at a node.',
        ],
      },

      {
        type: 'text',
        heading: '3.2 Vibrations in Tubes Closed at One End',
        text: 'When air vibrates inside a tube or pipe, the waves generated reflect at the ends, setting up a longitudinal stationary wave along the length of the tube. For a tube closed at one end, air is at rest at the closed end and vibrates freely at the open end. Therefore the fundamental vibration of the air column produces resonance of the column, and has a node at the closed end and an antinode at the open end. In stationary waves, the distance between a node and the consecutive antinode is $\\lambda/4$. Hence the length of the tube for the fundamental mode is a quarter of the wavelength:',
      },
      { type: 'math', tex: '\\ell = \\frac{\\lambda}{4} \\quad \\text{or} \\quad \\lambda = 4\\ell', caption: 'Equation 3.7' },
      {
        type: 'image',
        src: `${IMG}/10-closed-tube-modes.webp`,
        width: 1263, height: 1210, maxWidth: 520,
        alt: 'Three stacked diagrams of a tube closed at one end: (a) the fundamental with a single quarter-wave loop and ℓ = λ/4, (b) the first overtone with ℓ = 3λ/4, and (c) the second overtone with ℓ = 5λ/4',
        caption: 'Only the odd quarter-wavelengths fit a tube closed at one end — hence odd harmonics only.',
      },
      {
        type: 'text',
        text: 'The fundamental frequency $f_0$ then becomes:',
      },
      { type: 'math', tex: 'f_0 = \\frac{v}{\\lambda} = \\frac{v}{4\\ell}', caption: 'Equation 3.8' },
      {
        type: 'text',
        text: 'where $v$ is the velocity of the waves. Waves of higher frequencies can be generated also. For the first overtone, $\\ell = \\frac{3}{4}\\lambda_1$, which implies $\\lambda_1 = \\frac{4}{3}\\ell$. The frequency for this overtone is:',
      },
      { type: 'math', tex: 'f_1 = \\frac{v}{\\lambda_1} = \\frac{3v}{4\\ell} = 3f_0', caption: 'Equation 3.9' },
      {
        type: 'text',
        text: 'A similar calculation shows the frequency of the second overtone to be $5f_0$, indicating that only odd harmonics are present as overtones ($3f_0$, $5f_0$, $7f_0$, etc.) accompanying the fundamental note.',
      },

      {
        type: 'definition',
        heading: 'End correction',
        text: 'It has been observed that the antinode does not correspond exactly to the open end of the tube, but sits a little distance $c$ above it. This necessitates adding $c$ to the length of the tube as an end correction. A resonance tube is a form of tube closed at one end; its first and second positions of resonance correspond to the fundamental mode and the first overtone respectively.',
      },
      { type: 'math', tex: '\\ell_1 + c = \\frac{\\lambda}{4}', caption: 'Equation 3.10 — first position of resonance' },
      { type: 'math', tex: '\\ell_2 + c = \\frac{3\\lambda}{4}', caption: 'Equation 3.11 — second position of resonance' },
      {
        type: 'text',
        text: 'Subtracting equation 3.10 from equation 3.11, the unknown end correction $c$ cancels:',
      },
      { type: 'math', tex: '(\\ell_2 + c) - (\\ell_1 + c) = \\frac{3\\lambda}{4} - \\frac{\\lambda}{4} \\implies \\ell_2 - \\ell_1 = \\frac{\\lambda}{2}', caption: 'Equation 3.12' },
      {
        type: 'text',
        text: 'This shows that the wavelength can still be determined accurately despite the end correction, using equations 3.2 and 3.12. The wave velocity can be written in terms of the end correction as:',
      },
      { type: 'math', tex: 'v = \\lambda f = 4f(\\ell_1 + c)', caption: 'Equation 3.13' },

      {
        type: 'text',
        heading: 'Worked example — resonance tube',
        text: 'In a resonance tube experiment, the first position of resonance was observed to be 25 cm when a tuning fork of frequency 286 Hz was sounded and brought near the open end of the tube. If the wavelength of the wave was found to be 30 cm, determine the second position of resonance.',
      },
      {
        type: 'text',
        text: 'For the first position $\\ell_1 + c = \\lambda/4$; for the second, $\\ell_2 + c = 3\\lambda/4$. Subtracting, $\\ell_2 - \\ell_1 = \\lambda/2$, therefore:',
      },
      { type: 'math', tex: '\\ell_2 = \\frac{\\lambda}{2} + \\ell_1 = \\frac{0.3}{2} + 0.25 = 0.4\\,\\text{m}' },
      {
        type: 'note',
        text: 'The tuning-fork frequency of 286 Hz is not needed — the wavelength is given directly. Questions of this kind often carry a spare quantity to see whether you reach for the relation you actually need.',
      },

      {
        type: 'casestudy',
        title: 'Exercise',
        tasks: [
          'A sonometer wire 70 cm long and 1 mm in diameter has a tension of 60 N on it. If it produces a fundamental note of 400 Hz, calculate (i) the linear density of the wire and (ii) the density of the material of the wire.',
          'In a resonance tube experiment, the first position of resonance is 40 cm and the second position is 130 cm. Given that the velocity of waves in the air column is $340\\,\\text{ms}^{-1}$, calculate the frequency of the note and the end correction for the tube.',
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  {
    number: '4',
    title: 'Chapter Four — Electricity and Magnetism (Theoretical Background)',
    sections: [
      {
        type: 'text',
        heading: '4.1 Electric Current',
        text: 'When a source of electrical energy — a battery, for example — is connected to the two ends of a length of copper wire (an electrical conductor), an electric current made up of electrons flowing in one direction through the conductor is set up, provided the wire forms part of a closed conduction path called an electrical circuit. Each electron carries a definite amount of electric charge. If $Q$ is the total charge transported past a point in the conductor in a time interval $t$, the electric current $I$ is defined as:',
      },
      { type: 'math', tex: 'I = \\frac{Q}{t}', caption: 'Equation 4.1' },
      {
        type: 'text',
        text: 'In the SI system, current is measured in amperes (A). We also use a thousandth of an ampere, the milliampere (mA). The "driving force" for the current is provided by the battery and is called electromotive force, or simply e.m.f., measured in volts (V). Another term used to describe the driving force is voltage.',
      },
      {
        type: 'text',
        text: 'A quantity called potential, analogous to pressure in water flow, exists at each end of the copper wire. A potential difference $V$ between the two ends of the wire is a measure of the amount of work $W$ done in moving a charge $Q$ from one point to another against the resistance $R$ offered by the conductor to the flow of electrons. The resistance $R$ is defined as:',
      },
      { type: 'math', tex: 'R = \\frac{V}{I}', caption: 'Equation 4.2 — the SI unit of resistance is the ohm (Ω)' },

      {
        type: 'definition',
        heading: '4.2 Ohm\'s Law',
        text: 'Ohm\'s law states that the ratio of the potential difference $V$ between the two ends of a conductor in an electric circuit to the current $I$ flowing is a constant, provided the temperature and other physical conditions do not change. That constant depends only on the form, dimensions and physical condition of the conductor, and is termed the resistance $R$ of the conductor.',
      },
      { type: 'math', tex: 'V = IR', caption: 'Equation 4.3' },
      {
        type: 'text',
        text: 'The current flowing round a circuit is given by:',
      },
      { type: 'math', tex: 'I = \\frac{E}{R + r}', caption: 'Equation 4.4 — $E$ is the e.m.f. of the cell, $r$ its internal resistance, $R$ the total external resistance' },

      {
        type: 'text',
        heading: 'Temperature coefficient of resistance',
        text: 'The electrical resistance of a material varies with temperature. If the resistance of a wire is $R_0$ at $0°$C and $R_\\theta$ at temperature $\\theta°$C, then it is found that:',
      },
      { type: 'math', tex: 'R_\\theta = R_0(1 + \\alpha\\theta)', caption: 'Equation 4.5 — $\\alpha$ is the temperature coefficient of resistance' },
      { type: 'math', tex: '\\alpha = \\frac{R_\\theta - R_0}{R_0 \\theta}', caption: 'Equation 4.6' },
      {
        type: 'text',
        text: '$\\alpha$ can be determined experimentally by measuring the resistance of the wire at ice temperature and steam temperature and using equation 4.6. Alternatively, one can determine $R_\\theta$ at various temperatures and plot a graph of $R_\\theta$ against $\\theta$; rewriting equation 4.5 as $R_\\theta = R_0\\alpha\\theta + R_0$ shows that the slope is $R_0\\alpha$ and the intercept is $R_0$, from which $\\alpha$ follows.',
      },

      {
        type: 'text',
        heading: '4.3 Series and Parallel Connections of Resistance',
        text: 'Resistances can be connected in series or in parallel. Without repeating the proof, which is in your theory books, consider two or more resistances $R_1, R_2, \\ldots, R_n$.',
      },
      { type: 'math', tex: 'R_s = R_1 + R_2 + \\cdots + R_n', caption: 'Equation 4.7 — series' },
      { type: 'math', tex: '\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots + \\frac{1}{R_n}', caption: 'Equation 4.8 — parallel' },

      {
        type: 'text',
        heading: '4.4 Circuit Symbols',
        text: 'Electrical circuits are designed to perform specific functions, such as lighting a lamp. An electric circuit is created by interconnecting electrical components — a resistor and a battery are examples. In its simplest form, a circuit may contain a single source of electricity (e.g. a battery), a resistor (e.g. a torch light bulb), and the wires that form the path of flow from the source through the resistor and back. Circuit diagrams are used to represent a circuit on paper, and to facilitate communication among scientists and engineers the components are represented by a standard set of symbols.',
      },
      {
        type: 'image',
        src: `${IMG}/11-circuit-symbols.webp`,
        width: 1400, height: 1615, maxWidth: 480,
        alt: 'A labelled chart of twelve circuit symbols: (a) fixed resistor, (b) resistance box, (c) rheostat, (d) key, (e) two-way switch, (f) ammeter, (g) voltmeter, (h) galvanometer, (i) galvanometer with protective resistance P, (j) cell, (k) battery, (l) connecting wires',
        caption: 'Fig 4.1 — the twelve symbols used throughout the experiments in this chapter.',
      },
      {
        type: 'termlist',
        heading: 'The measuring instruments',
        items: [
          { term: 'Galvanometer', def: 'A sensitive instrument for detecting current. Too much current should not be passed through it; in metre bridge and potentiometer experiments a protective resistor $P$ is connected in series with it, or a shunt is connected across it to divert some of the current.' },
          { term: 'Ammeter', def: 'Measures electric current, and is always placed in series in the circuit. Its resistance is always very small, so that when placed in a circuit it does not diminish the current it is intended to measure.' },
          { term: 'Voltmeter', def: 'Measures the p.d. between two points in a circuit, and is always placed in parallel with the resistance whose p.d. is wanted. Its resistance is always very high, so that it does not divert an appreciable current from the circuit.' },
          { term: 'Cells', def: 'Different types are used in the laboratory — the Daniell cell (e.m.f. 1.1 V, internal resistance a few ohms) and the Leclanché cell (e.m.f. 1.45 V, internal resistance several ohms) supply current for short periods and are emptied after use. The lead accumulator (2 V) and the nife cell (1.5 V) both have low internal resistance; take great care not to short-circuit these, and keep at least 1–2 Ω in the circuit.' },
          { term: 'Battery', def: 'A group of similar cells arranged in series or in parallel.' },
        ],
      },
      {
        type: 'note',
        text: 'Note the polarity rule that applies to all of them: when connecting an electric meter in a circuit, the positive terminal should be connected to the positive side of the circuit, otherwise the pointer will read backwards.',
      },

      {
        type: 'text',
        heading: 'Cells in series and in parallel',
        text: 'If the e.m.f. and internal resistance of each cell are $E$ volts and $r$ ohms respectively, and there are $n$ cells in series, then the e.m.f. of the battery is $nE$ volts and the internal resistance is $nr$ ohms (equation 4.9). In parallel, the e.m.f. of the battery is $E$ volts — the e.m.f. of one cell only — and the internal resistance is $r/n$ ohms (equation 4.10). The usefulness of connecting two identical cells in parallel is that they provide twice the current capacity of either cell.',
      },
      {
        type: 'image',
        src: `${IMG}/12-cells-series-parallel.webp`,
        width: 1400, height: 497, maxWidth: 640,
        alt: 'Two circuit diagrams: Figure 4.2 shows three cells connected end to end in a single line (series); Figure 4.3 shows a diamond arrangement and a ladder arrangement of cells connected side by side (parallel)',
        caption: 'Figures 4.2 and 4.3 — cells in series (top) and two ways of drawing cells in parallel.',
      },
      {
        type: 'note',
        text: 'Equation 4.10 is printed in the manual as "Internal resistance = n/r". It is $r/n$ — $n$ equal resistances in parallel, exactly as equation 4.8 requires — and the manual\'s own "To Note" paragraph says $r/n$ four paragraphs later. Putting $n$ on top would mean adding cells in parallel *raises* the internal resistance, which is the opposite of why you do it.',
      },
      {
        type: 'image',
        src: `${IMG}/13-opn-battery.webp`,
        width: 1400, height: 677, maxWidth: 560,
        alt: 'A labelled cutaway of the OPN battery: a wooden box with a removable wooden cover, holding four torch batteries side by side between strips of copper foil, with connecting wires leading out from the positive and negative ends',
        caption: 'Fig 4.4 — the OPN (Okeke-PN) battery: four torch cells in a wooden housing, e.m.f. 1.5 V.',
      },
      {
        type: 'bullets',
        heading: 'To note — on batteries in a teaching laboratory',
        items: [
          'In some schools wet batteries and cells are not properly maintained, since there are no chargers, electrical experiments are not performed frequently, and there are so many students that it would be very expensive to provide enough batteries. For these reasons the manual introduces a battery which can supply current for quite some time, for ordinary simple electrical experiments such as the metre bridge, which draw very little current. It is made from three or four ordinary torch batteries housed as shown above, and is named the OPN (Okeke-PN) battery.',
          'Laboratory technologists should be able to construct a hundred of such batteries for their students\' experiments.',
          'The advantage of wet batteries over dry batteries is that wet batteries have a very low internal resistance, so a large current can be drawn from them without reducing the voltage across the terminals.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Important considerations in electrical experiments',
        items: [
          'The positive terminal of any electrical meter should always be connected to the positive side of the battery, otherwise the pointer will deflect in the opposite direction. If this occurs, switch off and interchange your connections to the meter.',
          'Do not switch on the circuit key for more than one minute. Take your readings without delay and open the key. This lengthens the life of your battery and prevents current fluctuations in your experiment.',
          'All DC ammeters and voltmeters have two terminals, one marked "+" (red) and the other "−" (black). The red (+) terminal must be connected so that it leads towards the positive terminal of the battery driving current in the circuit.',
          'An ammeter must be connected in series with a component to measure the current through that component. A voltmeter must be connected in parallel with the component.',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/14-ammeter-voltmeter-connection.webp`,
        width: 1400, height: 765, maxWidth: 560,
        alt: 'A circuit with current I flowing through a resistor R and an ammeter A connected in line with them, while a voltmeter V is connected on a parallel branch across the resistor',
        caption: 'Fig 4.4b — the ammeter sits in the current path; the voltmeter bridges the component.',
      },

      {
        type: 'text',
        heading: '4.5 The Wheatstone Bridge',
        text: 'The most convenient and accurate way of measuring resistance over a range of widely different values is by means of a Wheatstone bridge. It consists of four resistances $R_1$, $R_2$, $R_3$, $R_4$ connected as shown. The current from the battery divides between the two branches $ABC$ and $ADC$. By varying one of the resistances, a balance may be reached — meaning that no current flows through the galvanometer. We can easily prove that when this occurs:',
      },
      {
        type: 'image',
        src: `${IMG}/15-wheatstone-bridge.webp`,
        width: 1400, height: 858, maxWidth: 560,
        alt: 'A Wheatstone bridge drawn as a diamond: a battery on the left feeds the top and bottom corners, resistors R1 and R3 form the upper two arms, R2 and R4 the lower two, and a galvanometer G bridges the left and right corners',
        caption: 'Fig 4.5 — at balance no current flows through the galvanometer G bridging the two branches.',
      },
      { type: 'math', tex: '\\frac{R_1}{R_2} = \\frac{R_3}{R_4}', caption: 'Equation 4.11 — the balance condition' },

      {
        type: 'text',
        heading: '4.6 Metre Bridge',
        text: 'The metre bridge is one practical arrangement of the Wheatstone bridge. One branch $ADC$ consists of a wire of uniform cross-section and of length 100 cm, stretched along a metre rule. The point $D$ is located by a sliding contact. The unknown resistance $P$ is placed in the left arm while the known resistance $Q$ is placed in the right arm. For a balance, $\\frac{P}{Q} = \\frac{L\\sigma}{(100 - L)\\sigma}$, where $\\sigma$ is the resistance per unit length of the wire — that is:',
      },
      {
        type: 'image',
        src: `${IMG}/16-meter-bridge.webp`,
        width: 1400, height: 756, maxWidth: 660,
        alt: 'A metre bridge: resistances P and Q in the upper arms either side of a galvanometer, above a uniform wire stretched from A to C along a metre rule; the sliding contact D divides the wire into lengths L and 100 − L, with a cell and key in the lower branch',
        caption: 'Fig 4.6 — the sliding contact D replaces two of the bridge\'s four resistors with two lengths of one uniform wire.',
      },
      { type: 'math', tex: '\\frac{X}{R} = \\frac{L}{100 - L}', caption: 'Equation 4.12' },
      {
        type: 'note',
        text: 'The manual switches notation mid-derivation: the arms are introduced as $P$ (unknown) and $Q$ (known), but equation 4.12 writes them as $X$ and $R$. They are the same two resistances. The resistance per unit length $\\sigma$ cancels, which is the whole point — you never need to know it.',
      },
      {
        type: 'bullets',
        heading: 'Using the metre bridge',
        items: [
          'Never press the sliding contact hard onto the wire; contact should be light, so as not to make the wire non-uniform.',
          'Clean the wire properly with acetone if available, and the jockey with emery cloth.',
          'The galvanometer will be damaged if too great a current is passed through it. A battery of 1.5–2 V should be used. Make use of a high series resistor to protect the galvanometer while trying to get a rough balance, then short-circuit it to get the final balance point.',
        ],
      },

      {
        type: 'text',
        heading: '4.7 Wheatstone Bridge with Fixed Ratio Arms',
        text: 'This is a slightly different way of arranging the Wheatstone bridge. Two of the four resistances, $R_1$ and $R_2$, have a known ratio $R_1/R_2$. The unknown resistance $R_x$ is connected between $A$ and $D$, and a variable resistor $R$ in the form of a resistance box is connected in the fourth arm. When there is a balance, $\\frac{R_1}{R_2} = \\frac{R_x}{R}$, therefore:',
      },
      { type: 'math', tex: 'R_x = \\frac{R R_1}{R_2}', caption: 'Equation 4.13' },

      {
        type: 'text',
        heading: '4.8 Resistivity of a Wire',
        text: 'Suppose the resistance $R$ of a wire is found by the use of a Wheatstone bridge. The resistivity $\\rho$ of the material of the wire is defined by:',
      },
      { type: 'math', tex: 'R = \\rho\\frac{l}{A} = \\frac{\\rho l}{\\pi\\left(\\frac{d}{2}\\right)^2}', caption: 'Equation 4.14 — $d$ is the diameter and $l$ the length' },
      { type: 'math', tex: '\\therefore \\rho = \\frac{R\\pi d^2}{4l}', caption: 'Equation 4.15' },

      {
        type: 'text',
        heading: '4.9 The Potentiometer and its Applications',
        text: 'The potentiometer consists of a uniform resistance wire $AB$ of length about 100 cm, through which a source of constant e.m.f. — an accumulator — maintains a steady current $I$. The potentiometer, like the metre bridge, can easily be constructed in a workshop. Since the wire is uniform, the resistance per unit length is constant, so $R \\propto L$; therefore, for a constant current $I$, $V = IR \\propto L$, and $V = kL$.',
      },
      {
        type: 'bullets',
        heading: 'What a potentiometer is used for',
        items: [
          'Comparison of the e.m.f. of two cells.',
          'Comparison of two resistances.',
          'Measurement of the internal resistance of cells.',
        ],
      },

      {
        type: 'text',
        heading: '4.10 Comparison of e.m.f.',
        text: 'Suppose the circuit is connected as shown, with $E$ a Daniell cell, and let balance occur at point $C$. This means that no current flows along $AHC$ — that is, the potential at $H$ equals the potential at $C$. Then the p.d. across $CA$ equals $E$, the e.m.f. of the cell:',
      },
      { type: 'math', tex: 'kL = E', caption: 'Equation 4.16' },
      {
        type: 'image',
        src: `${IMG}/17-potentiometer-principles.webp`,
        width: 1400, height: 452, maxWidth: 680,
        alt: 'Two potentiometer circuits side by side: Fig 4.7 shows a bare potentiometer wire from B to A with a cell in the driving circuit above it; Fig 4.8 adds a jockey J at balance length L from A, with a galvanometer G and the cell E connected between the jockey and point H',
        caption: 'Figs 4.7 and 4.8 — the driving circuit above the wire, the cell under test tapped off it through a galvanometer.',
      },
      {
        type: 'text',
        text: 'Hence the e.m.f. $E$ is proportional to the balance length $L$. Therefore, if a cell of e.m.f. $E_1$ gives a balance length $L_1$ and a cell of e.m.f. $E_2$ gives balance length $L_2$, then since $E_1 = kL_1$ and $E_2 = kL_2$:',
      },
      { type: 'math', tex: '\\frac{E_1}{E_2} = \\frac{L_1}{L_2}', caption: 'Equation 4.17' },

      {
        type: 'text',
        heading: 'Comparison of resistances',
        text: 'Consider two accumulators $C_1$ and $C_2$ connected together with resistances $R_1$ and $R_2$. Since the same current $I$ passes through both resistances, the ratio of the p.d.s is the ratio of the resistances: $\\frac{V_{AB}}{V_{BC}} = \\frac{IR_1}{IR_2} = \\frac{R_1}{R_2}$. If a balance $L_1$ is obtained with $X$ connected to $A$ and $Y$ connected to $B$, and a balance $L_2$ when $X$ is connected to $B$ and $Y$ to $C$, then:',
      },
      { type: 'math', tex: '\\frac{V_{AB}}{V_{BC}} = \\frac{L_1}{L_2} = \\frac{R_1}{R_2}' },

      {
        type: 'text',
        heading: 'Measurement of the internal resistance of a cell',
        text: 'Let the cell $C_2$ have internal resistance $r$. Let $L_0$ be the balance length with $K_2$ open and $K_1$ closed, and $L$ the balance length when both keys are closed and $R$ has some value. If $E$ is the e.m.f. of $C_2$ and $V$ is the p.d. across its terminals when $K_2$ is closed, then $I = \\frac{E}{R+r} = \\frac{V}{R}$, where $I$ is the current through $R$. Therefore $\\frac{V}{E} = \\frac{R}{R+r}$; and since $E = kL_0$ and $V = kL$:',
      },
      {
        type: 'image',
        src: `${IMG}/18-internal-resistance-circuits.webp`,
        width: 1400, height: 549, maxWidth: 680,
        alt: 'Two potentiometer circuits for internal resistance: Fig 4.9 shows accumulator C1 with a rheostat driving the wire, resistances R1 and R2 tapped at points A, B and C through a galvanometer to a potentiometer below; Fig 4.10 shows cell C2 with key K2 and resistance box R connected across it, balanced against length L on the wire driven by C1 and key K1',
        caption: 'Figs 4.9 and 4.10 — comparing resistances (left) and measuring a cell\'s internal resistance (right).',
      },
      { type: 'math', tex: '\\frac{R}{R+r} = \\frac{V}{E} = \\frac{kL}{kL_0} = \\frac{L}{L_0}' },
      { type: 'math', tex: '\\therefore \\frac{1}{L} = \\frac{1}{L_0}\\left(\\frac{R+r}{R}\\right)', caption: 'Equation 4.18' },
      {
        type: 'text',
        text: 'Or, rearranged into the form of a straight line:',
      },
      { type: 'math', tex: '\\frac{1}{L} = \\frac{r}{L_0}\\left(\\frac{1}{R}\\right) + \\frac{1}{L_0}' },
      {
        type: 'text',
        text: 'Therefore a graph of $1/L$ against $1/R$, as $L$ and $R$ vary, will be a straight line with slope $r/L_0$ and intercept $1/L_0$, from which $r$ can be calculated.',
      },
      {
        type: 'bullets',
        heading: 'Practical precautions for this measurement',
        items: [
          'The accumulator $C_1$ must be fully charged. Test by connecting a voltmeter across its terminals: a lead-acid accumulator should give at least 2 V, an alkaline cell or O.I. battery 1.5 V.',
          'Since uniformity of the wire is very important, the contact between the movable contact and the wire must be light, to avoid making depressions on the wire.',
          'To protect the galvanometer, use a high resistor to locate an approximate point of balance. To find a balance point, touch the two ends of the wire with the jockey; the galvanometer should indicate opposite deflections. If it deflects in the same direction at both ends there are two possible reasons — either the wrong terminal of $C_1$ is connected to $C_2$, or the p.d. between the ends of the wire is less than the e.m.f. $E$ of the cell. In the former case, reversing the leads to $C_1$ will allow a balance to be achieved; in the latter, $C_1$ will need to be replaced by two or more accumulators in series.',
        ],
      },

      {
        type: 'text',
        heading: 'Electrical heating',
        text: 'One important method of heating a liquid in a container is by use of a resistance coil. The circuit shown below is set up, and when the current is switched on, the total amount of electrical energy given to the coil in a time $t$ is $IVt = I^2Rt$. This heat energy is given up to the liquid and the container, so that:',
      },
      {
        type: 'image',
        src: `${IMG}/19-electrical-heating.webp`,
        width: 1400, height: 858, maxWidth: 560,
        alt: 'A calorimeter packed in felt containing a liquid, a stirrer and an electric heater coil with a thermometer through the cover; above it a circuit with a battery, switch S, ammeter A, voltmeter V and a rheostat',
        caption: 'Fig 4.11 — the heating coil sits in the liquid; the ammeter and voltmeter give the power delivered to it.',
      },
      { type: 'math', tex: 'IVt = I^2Rt = (\\theta - \\theta_i)(mc + m_c c_c)', caption: 'Equation 4.19' },
      {
        type: 'text',
        text: 'where $R$ is the resistance of the coil, $\\theta_i$ the initial temperature of the liquid, $m$ and $c$ the mass and specific heat capacity of the liquid, $m_c$ and $c_c$ the mass and specific heat capacity of the container, and $\\theta$ the temperature after a time $t$. From the above we can write:',
      },
      { type: 'math', tex: '\\theta - \\theta_i = \\frac{IVt}{mc + m_c c_c}' },
      { type: 'math', tex: '\\therefore \\theta = \\frac{IVt}{mc + m_c c_c} + \\theta_i = bt + \\theta_i', caption: 'Equation 4.20, where $b = \\frac{IV}{mc + m_c c_c}$ is a constant' },
      {
        type: 'text',
        text: 'Then a graph of $\\theta$ against $t$ will be a straight line with slope equal to $b$ and intercept equal to $\\theta_i$. Electrical heating has an important advantage in that uncertain heat loss during the transfer of a hot body to the calorimeter is eliminated.',
      },

      {
        type: 'text',
        heading: '4.11 Detection of Electric Current',
        text: 'The galvanometer is a sensitive instrument used for detecting electric current. The most commonly used type in our institutions is the centre-zero galvanometer.',
      },
      {
        type: 'image',
        src: `${IMG}/20-galvanometer.webp`,
        width: 819, height: 588, maxWidth: 380,
        alt: 'A bench galvanometer in a sloping case, with a centre-zero scale graduated either side of the middle and a pointer resting at the centre',
        caption: 'Fig 4.12 — the centre-zero scale lets the pointer swing either way, which is what makes it a null detector.',
      },
      {
        type: 'text',
        text: 'Much current should not be passed through a galvanometer, otherwise it will be damaged. In metre bridge and potentiometer experiments, a protective resistor should be connected in series with it, or a shunt connected across it. In these experiments the galvanometer is always used to determine the balance point, when no current is passing through it and so the pointer is not deviated to either side.',
      },
      {
        type: 'text',
        heading: 'Measurement of electric current',
        text: 'The unit of electric current is the ampere, and the instrument used for measuring it is the ammeter; that used for measuring smaller currents is the milliammeter.',
      },
      {
        type: 'image',
        src: `${IMG}/21-ammeter-milliammeter.webp`,
        width: 1400, height: 370, maxWidth: 680,
        alt: 'Two bench meters photographed side by side: on the left an ammeter in a sloping case with a curved scale, on the right a milliammeter in an upright square case',
        caption: 'Figs 4.13(a) and 4.13(b) — the ammeter and the milliammeter differ only in the range of their scale.',
      },
      {
        type: 'text',
        text: 'The resistance of the ammeter should be very small, otherwise it will increase the resistance in the circuit and reduce the current it is meant to measure. When connecting meters which measure in one direction only, the positive terminal of the meter should be connected to the positive side of the circuit, otherwise the pointer will read backwards. A centre-zero instrument can measure current in either direction, so it can be connected either way round. Some ammeters are calibrated in amperes, others in milliamperes; some measure direct current, others alternating current. They are also designed to measure more than one range, and any required range can be obtained by plugging into the appropriate socket.',
      },

      {
        type: 'text',
        heading: '4.12 Measurement of Potential Difference',
        text: 'The unit of potential difference is the volt, and the instrument used for measuring the p.d. between two points in a circuit is the voltmeter. The ammeter is always connected in series with the resistor, while the voltmeter is always connected in parallel with the resistor, to measure the potential difference across the resistor or cell. The resistance of a voltmeter is always very high, so that when placed across part of a circuit it does not divert an appreciable current from the main circuit. As with the ammeter, if the voltmeter measures potential difference in one direction only, the positive terminal of the instrument should be connected to the positive pole of a cell, or to the positive end of a resistor.',
      },
      {
        type: 'image',
        src: `${IMG}/22-voltmeter.webp`,
        width: 1400, height: 489, maxWidth: 680,
        alt: 'Left: a photograph of a square-cased voltmeter with a curved scale marked in volts. Right: a circuit diagram with a cell driving current through a resistor R, an ammeter A in series with the circuit and a voltmeter V connected in parallel across R',
        caption: 'Figs 4.14 and 4.15 — the instrument, and where it belongs in the circuit.',
      },
      {
        type: 'note',
        text: 'The common voltmeters used in our laboratories are calibrated in volts and millivolts, and come in various ranges. If you take one rule from this chapter into the lab, take this one: ammeter in series, voltmeter in parallel. Reversing the two is the single most common way of getting a meaningless reading — and of damaging a meter.',
      },
    ],
  },
];
