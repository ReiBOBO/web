def main():
    def check(paras:string, replacement:int):
        count = 0
        stack = []
        for p in paras:
            if p == '<':
                count+=1
            elif p == '>' and count>0:
                count-=1
            elif p=='>' and count==0:
                if(replacement<=0):
                    return False
                replacement=-1
        return count==0
    i=0
    for para in parathesis:
        if not check(para,replacement[i]):
            return False
        i+=1
    return True