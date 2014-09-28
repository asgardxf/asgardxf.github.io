

n, a, b = tuple(int(x) for x in input().split(' '))

from itertools import product


def calc_prox(al, bl, sq):
	step = sq // al
	l = []
	#a2,b2 = None, None
	#for a1 in range(a-10, a+10):
	#	for b1 in range(b-10, b+10):
	r1, r2, r3, r4 = al-10*step, al+10*step, bl-10*step, bl+10*step
	r1 = r1 if r1 > 0 else a
	r3 = r3 if r3 > 0 else b
	for (a1, b1) in product(range(r1, r2), range(r3, r4)):
		l.append((a1,b1))
		if a1*b1 == sq:
			break
	else:
		print('SOMETHING WRONG! square is: ', sq)
		print(l)
	return a1, b1

def main():
	
	
	s = n*6
	#print('default= ', s)
	if a*b >= s:
		print(a*b)
		print(a, b)
		return None
	
	a1 = int(s**0.5)
	
	b1 = a1
	ta, tb = a1+1, b1+1
	
	l = list()
	c=0
	if a > ta:
		ta = a
		c+=1
	if b > tb:
		tb = b
		c+=1
		
	if c == 2:
		print(a*b)
		print(a, b)
		return None
	ts1 = ta*tb
	ta1, tb1 = ta, tb
	while True:
		ta+=1
		tb-=1
		#if a > ta or b > tb:
		#	print('error!', a, b, ta, tb)
		#l.append((ta, tb, ta*tb))
		ts = ta*tb
		
		if ts <= s:
			if ta1*tb1 != ts:
				pass
			break
		ts1 = ta*tb
		ta1, tb1 = ta, tb
		
	#l.sort(key=lambda x: x[2])
	
	if ts == s:
		return None
	else:
		a1, b1 = calc_prox(ta1, tb1, s)
		print(s)
		print(a1, b1)
		return None
	if ts < s:
		#print(ts1)
		#print(ta1, tb1)
		print(ts, ta, tb, 'defualt= ', s, 'cached= ', ts1, a1, b1, 'branch')
		return None
	print(ts)
	print(ta, tb)
	
	print(ts, ta, tb, 'defualt= ', s, 'cached= ', ts1)
		
	
main()



#for x in range(1,50):
	#n = x
	#main()