# rm-ignore-file [![npm](https://img.shields.io/npm/v/rm-ignore-file.svg)](https://npmjs.com/package/rm-ignore-file)

Find the files or folders declared in. gitignore and delete them

## Install

```bash
npm i rm-ignore-file
```

### Usage

- Remove all files and folders in .gitignore

```bash
rmg
```
![rmg](./imgs/rmg.png)

- Dry run

```bash
rmg -d
```

![dry run](./imgs/dry_run.png)

- Skip certain folders or files

```bash
rmg dist node_* *.log
```

![skip](./imgs/skip.png)

## License

[MIT](./LICENSE) License © 2024 [duowb](https://github.com/duowb)
