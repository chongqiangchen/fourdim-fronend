## Fourdim Frontend

> 区块链工具页面，目前仅支持BSC - 以学习技术为主

当前项目使用Pnpm Workspace和Nx构建该monorepo仓库。

### 正在做的事情

- [ ] `fourdim-web3-hooks`仓库拆分进`@fourdimtool/*`各个仓库下
- [ ] 完善各个仓库的npm包发布工具脚本
- [ ] 部署至git pages

### 开发本项目相关
```
    pnpm install
    pnpm run lib:build
    pnpm run toolpage:start
```

### 涉及自建库

- [Contract Form](https://github.com/chongqiangchen/contract-form)
- [fourdim-web3-hooks](https://github.com/chongqiangchen/fourdim-web3-hooks)
- [web3-block-helper](https://github.com/chongqiangchen/web3-block-helper)

> 使用monorepo方式，将会将上面面部分内容移入当前仓库下，方便维护 (进行中)
- [@fourdimtool/web3-abi]()
- [@fourdimtool/web3-parser]()
- [@fourdimtool/web3-core]()
- [@fourdimtool/web3-react]()

### 构建计划

- [x] 账户货币信息
- [x] 货币
    - [x] 单币批量转移
    - [x] 单号批量转移
    - [x] 多号批量归集
    - [ ] 自动滑点SWAP / 判断交易滑点 （参考poocoin）
- [ ] NFT
    - [ ] NFT批量转移
    - [ ] NFT批量归集
    - [ ] NFT定向交易 （指定买家，付款获取NFT，省去担保人）
- [ ] 钱包
    - [ ] 批量生成账户
    - [ ] 查询时间段内gas消耗
    - [ ] 查询...
- [ ] 其他
    - [ ] Chainlist
    - [ ] [Contract Form](https://github.com/chongqiangchen/contract-form) 应用，类remix合约调用方案