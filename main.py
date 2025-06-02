import sys
import time

def main():
        try:
            while True:
                    time.sleep(1)
                    sys.stdout.write("hi\n") 
                    sys.stdout.flush()
        except(OSError):
            sys.exit(0)
    

main()


