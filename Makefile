
.PHONY: null
null:
	$(info Compiles Skeletor using various systems)
	$(info Currently available:)
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

.PHONY: electron
electron:
	$(info Install dependencies)
	$(MAKE) -C ./electron install

	$(info Build for this platform)
	$(MAKE) -C ./electron build

	$(info Bundle for this platform)
	$(MAKE) -C ./electron bundle

	$(info Copy built zipfiles)
	cp ./electron/dist/*.zip dist/


