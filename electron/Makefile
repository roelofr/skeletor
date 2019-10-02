GCC = gcc

ifneq ($(OS),Windows_NT)
    UNAME_S := $(shell uname -s)
    ifeq ($(UNAME_S),Linux)
        GCC = x86_64-w64-mingw32-gcc
    endif
endif

# Add default
.PHONY: default
default: install build

# Add install
.PHONY: install
install: yarn.lock package.json
	yarn install

# Add cmdmp3 builder
lib/cmdmp3/cmdmp3.exe:
	$(GCC) -c -o lib/cmdmp3/cmdmp3.exe lib/cmdmp3/cmdmp3.c

bin/cmdmp3.exe: lib/cmdmp3/cmdmp3.exe
	test -d bin/ || mkdir bin/
	cp lib/cmdmp3/cmdmp3.exe bin/

# Add assets symlink
assets: ../assets
ifeq ($(OS), Windows_NT)
	mkdir assets
	cp ../assets/* assets
else
	test -h assets || ln -s ../assets assets
endif

# Build platform-dependent
.PHONY: build
build:
ifeq ($(OS), Windows_NT)
	$(MAKE) dist/doot-doot-win32-x64/doot.exe
else
	$(MAKE) dist/doot-doot-linux-x64/doot
endif

# Bundle platform-dependent
.PHONY: bundle
bundle: build
ifeq ($(OS), Windows_NT)
	$(MAKE) dist/doot-doot-win32-x64.zip
else
	$(MAKE) dist/doot-doot-linux-x64.zip
endif

# Build linux bundle
dist/doot-doot-linux-x64/doot: assets
	yarn run build-linux

# Build Windows bundle
dist/doot-doot-win32-x64/doot.exe: assets bin/cmdmp3.exe assets/doot.ico assets/doot-large.ico
	yarn run build-win32

# Zip linux
dist/doot-doot-linux-x64.zip: dist/doot-doot-linux-x64/doot
	cd dist/doot-doot-linux-x64 && zip -FS -r -0 ../../dist/doot-doot-linux-x64.zip .

# Zip windows
dist/doot-doot-win32-x64.zip: dist/doot-doot-win32-x64/doot.exe
	cd dist/doot-doot-win32-x64 && zip -FS -r -0 ../../dist/doot-doot-win32-x64.zip .

# Add icons
assets/doot.ico: assets/doot-16.png assets/doot-20.png assets/doot-24.png assets/doot-32.png
	convert assets/doot-16.png assets/doot-20.png assets/doot-24.png assets/doot-32.png assets/doot.ico

# Add large icons
assets/doot-large.ico: assets/doot-32.png assets/doot-40.png assets/doot-48.png assets/doot-64.png assets/doot.png
	convert assets/doot-32.png assets/doot-40.png assets/doot-48.png assets/doot-64.png assets/doot.png assets/doot-large.ico
