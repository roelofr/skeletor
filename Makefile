.PHONY: all ico

default: ico dist/doot-doot-linux-x64.zip dist/doot-doot-win32-x64.zip

ico: assets/doot.ico assets/doot-large.ico

lib/cmdmp3/cmdmp3.exe:
	x86_64-w64-mingw32-gcc -c -o lib/cmdmp3/cmdmp3.exe lib/cmdmp3/cmdmp3.c

lib/cmdmp3/cmdmp3win.exe:
	x86_64-w64-mingw32-gcc -c -o lib/cmdmp3/cmdmp3win.exe lib/cmdmp3/cmdmp3win.c

bin/cmdmp3.exe: lib/cmdmp3/cmdmp3.exe lib/cmdmp3/cmdmp3win.exe
	test -d bin/ || mkdir bin/
	cp lib/cmdmp3/cmdmp3.exe lib/cmdmp3/cmdmp3win.exe bin/

dist/doot-doot-linux-x64/doot:
	yarn run build-linux

dist/doot-doot-win32-x64/doot.exe: bin/cmdmp3.exe
	yarn run build-win32

dist/doot-doot-linux-x64.zip: dist/doot-doot-linux-x64/doot
	(	cd dist/doot-doot-linux-x64 && \
		zip -r0 ../doot-doot-linux-x64-new.zip . && \
		mv ../doot-doot-linux-x64-new.zip ../doot-doot-linux-x64.zip	)

dist/doot-doot-win32-x64.zip: dist/doot-doot-win32-x64/doot.exe
	(	cd dist/doot-doot-win32-x64 && \
		zip -r0 ../doot-doot-win32-x64-new.zip . && \
		mv ../doot-doot-win32-x64-new.zip ../doot-doot-win32-x64.zip	)

assets/doot.ico: assets/doot-16.png assets/doot-20.png assets/doot-24.png assets/doot-32.png
	convert assets/doot-16.png assets/doot-20.png assets/doot-24.png assets/doot-32.png assets/doot.ico

assets/doot-large.ico: assets/doot-32.png assets/doot-40.png assets/doot-48.png assets/doot-64.png assets/doot.png
	convert assets/doot-32.png assets/doot-40.png assets/doot-48.png assets/doot-64.png assets/doot.png assets/doot-large.ico
