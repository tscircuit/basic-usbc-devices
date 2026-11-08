from functools import lru_cache
import json
names=['limit','button','toggle','dial','position','distance','hub','display','resetter','buzzer']
sizes=[(24,30)]*6+[(44,42),(32,42),(42,42),(24,30)]
@lru_cache(None)
def solve(mask):
 if mask&(mask-1)==0:
  i=mask.bit_length()-1;w,h=sizes[i]
  return {(w,h):[(i,0,0,w,h,0)],(h,w):[(i,0,0,h,w,90)]}
 out={};sub=(mask-1)&mask
 while sub:
  other=mask^sub
  if other and sub<other:
   for (w1,h1),a in solve(sub).items():
    for (w2,h2),b in solve(other).items():
     for vertical in [False,True]:
      w,h=(max(w1,w2),h1+h2+3) if vertical else (w1+w2+3,max(h1,h2))
      if (w,h) in out:continue
      dx,dy=(0,h1+3) if vertical else (w1+3,0)
      out[w,h]=a+[(i,x+dx,y+dy,bw,bh,r) for i,x,y,bw,bh,r in b]
  sub=(sub-1)&mask
 # Pareto frontier
 best={};lowh=99999
 for (w,h),p in sorted(out.items()):
  if h<lowh:best[w,h]=p;lowh=h
 return best
best=sorted(solve(1023).items(),key=lambda a:((a[0][0]+16)*(a[0][1]+16),abs(a[0][0]-a[0][1])))
for (w,h),p in best[:5]:print(w+16,h+16,(w+16)*(h+16),p)
(w,h),p=best[0]
json.dump({'panelSize':{'width':w+16,'height':h+16},'modules':[dict(name=names[i],x=x+bw/2-w/2,y=y+bh/2-h/2,w=bw,h=bh,rotation=r) for i,x,y,bw,bh,r in p],'method':'Exhaustive Pareto-pruned guillotine packing with 90-degree rotations, 3 mm channels, 8 mm outer margins; minimal area in this search class.'},open('panel4-layout.json','w'),indent=2)
