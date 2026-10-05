# Images

Drop images here and reference them from the files in `src/constants/` with a path that starts with `/images/...`.

Suggested layout:

```
public/images/
  logo.png
  hero.png
  architecture/overall.png
  components/mca.png  rpe.png  apm.png  fspa.png
  team/sakindu.jpg  ishan.jpg  methush.jpg  shanika.jpg
  team/supervisor.jpg  co-supervisor.jpg
  presentations/proposal.png  pp1.png  pp2.png  final.png
```

Example: in `src/constants/team.js` set `image: "/images/team/ishan.jpg"`.
Any `image: null` shows a styled placeholder (initials or icon) until you add one.
