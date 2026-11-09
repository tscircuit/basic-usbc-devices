from functools import lru_cache
import json
# Two independent 3 mm routes must leave a 5 mm solid carrier between boards.
ROUTE_WIDTH = 3
CARRIER_WIDTH = 5
BOARD_GAP = 2 * ROUTE_WIDTH + CARRIER_WIDTH
EDGE_MARGIN = ROUTE_WIDTH + CARRIER_WIDTH
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
      w,h=(max(w1,w2),h1+h2+BOARD_GAP) if vertical else (w1+w2+BOARD_GAP,max(h1,h2))
      if (w,h) in out:continue
      dx,dy=(0,h1+BOARD_GAP) if vertical else (w1+BOARD_GAP,0)
      out[w,h]=a+[(i,x+dx,y+dy,bw,bh,r) for i,x,y,bw,bh,r in b]
  sub=(sub-1)&mask
 # Pareto frontier
 best={};lowh=99999
 for (w,h),p in sorted(out.items()):
  if h<lowh:best[w,h]=p;lowh=h
 return best
best=sorted(solve(1023).items(),key=lambda a:((a[0][0]+2*EDGE_MARGIN)*(a[0][1]+2*EDGE_MARGIN),abs(a[0][0]-a[0][1])))
for (w,h),p in best[:5]:print(w+2*EDGE_MARGIN,h+2*EDGE_MARGIN,(w+2*EDGE_MARGIN)*(h+2*EDGE_MARGIN),p)
(w,h),p=best[0]
json.dump({'panelSize':{'width':w+2*EDGE_MARGIN,'height':h+2*EDGE_MARGIN},'modules':[dict(name=names[i],x=x+bw/2-w/2,y=y+bh/2-h/2,w=bw,h=bh,rotation=r) for i,x,y,bw,bh,r in p],'method':'Exhaustive Pareto-pruned guillotine packing with 90-degree rotations, 11 mm board gaps (two 3 mm routes and a 5 mm solid carrier), 8 mm outer margins; minimal area in this search class.'},open('panel4-layout.json','w'),indent=2)
