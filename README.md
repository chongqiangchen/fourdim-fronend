## Fourdim Web3 Tool Page

### Quick
> 大部分功能优先开发服务于BSC链的用户，后面在进行其他链的扩展

```
    yarn
    yarn start
```

### 涉及自建库

- [Contract Form](https://github.com/chongqiangchen/contract-form)
- [fourdim-web3-hooks](https://github.com/chongqiangchen/fourdim-web3-hooks)
- [web3-block-helper](https://github.com/chongqiangchen/web3-block-helper)

### 构建计划

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