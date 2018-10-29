# Lambaデプロイ用パッケージの作成
LAMBDA_FILE=Coffeeshop.zip

.PHONY: all
all: deploypkg

deploypkg: *.js
	# 最新バージョンのask-sdk-coreパッケージをダウンロード
	npm install --save ask-sdk-core ask-sdk-model
	zip -r $(LAMBDA_FILE) ./* -x "*.DS_Store"
	mv $(LAMBDA_FILE) ../..

clean:
	rm -r node_modules/*
	rm ../../$(LAMBDA_FILE)