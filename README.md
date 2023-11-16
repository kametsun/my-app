# README

# version
* ubuntu: 22.04.3 LTS
* ruby: 3.2.2
* Rails: 7.1.2
* node.js: 21.1.0 
* npm: 10.2.0
* mysql: 8.0.35-0ubuntu0.22.04.1 for Linux on x86_64

# Getting Started
1. Create Rails App
```
rails new my-app -j esbuild -d mysql
```

2. React install
```
npm i react react-dom
```

3. Change Package.json
To rebundle everything when file changes are detected.

```
// ./package.json
"scripts": {
    "build": "esbuild app/javascript/*.* --bundle --sourcemap --outdir=app/assets/builds --loader:.js=jsx",
    "watch": "esbuild app/javascript/*.* --watch --bundle --outdir=app/assets/builds --loader:.js=jsx"
  }
```

4. Change Procfile.dev
```
// ./Procfile.dev
web: bin/rails s -p 3000
js: npm run watch
```

5. Setting database<br>
<br>
Set database user and password in ./config/database.yml to match your environment

6. Start App!<br>
```
$ bin/dev
```