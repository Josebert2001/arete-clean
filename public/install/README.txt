Install screenshots
===================

Drop PNG screenshots here. The Install page references them via:

  src/pages/Install.jsx  →  steps[n].image: '/install/<filename>.png'

Suggested filenames (match the slots already wired in Install.jsx):

  java-jdk-download.png        Oracle JDK download page
  java-netbeans-download.png   NetBeans download page
  java-hello-run.png           NetBeans Output panel with "Hello, World!"

  python-anaconda-download.png Anaconda download page
  python-navigator-jupyter.png Anaconda Navigator with JupyterLab tile
  python-jupyterlab-cell.png   JupyterLab with the verify cell run

  c-msys2-pacman.png           MSYS2 terminal after installing GCC
  c-netbeans-plugin.png        NetBeans Plugins panel — installing C/C++
  c-netbeans-hello-run.png     NetBeans Output panel running hello.c

Image guidelines:
  • PNG, JPG, or WebP — keep each file under 400 KB
  • Width up to ~1400px is fine (the UI caps display width)
  • Crop tight to the relevant UI; redact any personal info

Until a screenshot is dropped in, the slot shows a small placeholder card.
