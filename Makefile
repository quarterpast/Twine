LS_OPTS=-k

LS_FILES=index.ls
JS_FILES = $(patsubst %.ls, %.js, $(LS_FILES))

.PHONY: all
all: $(JS_FILES)

%.js: %.ls
	@mkdir -p "$(@D)"
	lsc -pc $(LS_OPTS) "$<" > "$@"

clean:
	rm $(JS_FILES)

watch:
	@while :; do inotifywait -qr -e modify -e create src; make; sleep 1; done