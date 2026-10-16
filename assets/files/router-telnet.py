import socket
import sys
import threading
import msvcrt

HOST = "192.168.0.1"
PORT = 2323

IAC = 255
DO, DONT, WILL, WONT = 253, 254, 251, 252

sock = socket.create_connection((HOST, PORT))
output = sys.stdout.buffer

def receive():
    state = 0
    command = 0

    try:
        while True:
            data = sock.recv(8192)
            if not data:
                break

            clean = bytearray()

            for b in data:
                if state == 0:
                    if b == IAC:
                        state = 1
                    else:
                        clean.append(b)
                elif state == 1:
                    if b == IAC:
                        clean.append(IAC)
                        state = 0
                    elif b in (DO, DONT, WILL, WONT):
                        command = b
                        state = 2
                    else:
                        state = 0
                else:
                    if command == DO:
                        sock.sendall(bytes([IAC, WONT, b]))
                    elif command == WILL:
                        sock.sendall(bytes([IAC, DONT, b]))
                    state = 0

            if clean:
                output.write(clean)
                output.flush()
    except OSError:
        pass

threading.Thread(target=receive, daemon=True).start()

try:
    while True:
        key = msvcrt.getch()

        if key in (b'\x00', b'\xe0'):
            msvcrt.getch()
            continue

        if key == b'\r':
            key = b'\r\n'

        sock.sendall(key)

except (KeyboardInterrupt, OSError):
    pass
finally:
    sock.close()