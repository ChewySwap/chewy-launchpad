/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Block {
    /** @example "26618801760" */
    base_fee_per_gas: string;
    /** @example "261263193229977120" */
    burnt_fees: string;
    /** @example 85.19028810863084 */
    burnt_fees_percentage: number;
    /** @example "0" */
    difficulty: string;
    /** @example "TODO" */
    extra_data: string;
    /** @example "30000000" */
    gas_limit: string;
    /** @example -34.56675333333333 */
    gas_target_percentage: number;
    /** @example "9814987" */
    gas_used: string;
    /** @example 32.71662333333333 */
    gas_used_percentage: number;
    /** @example "0xf569ec751152b2f814001fc730f7797aa155e4bc3ba9cb6ba24bc2c8c9468c1a" */
    hash: string;
    /** @example 17615720 */
    height: number;
    miner: AddressParam;
    /** @example "0x0000000000000000" */
    nonce: string;
    /** @example "0xd464e02d81e2bdf6bc5fa9b8e33f0b564c464a82d821a3e56531f8636dc00dfa" */
    parent_hash: string;
    /** @example "45418705646601378" */
    priority_fee: string;
    rewards: Reward[];
    /** @example 49997 */
    size: number;
    /** @example "TODO" */
    state_root: string;
    /** @example "2023-07-03T20:09:59.000000Z" */
    timestamp: string;
    /** @example "58750003716598352816469" */
    total_difficulty: string;
    /** @example 120 */
    tx_count: number;
    /** @example "306681898876578498" */
    tx_fees: string;
    /** @example "block" */
    type: string;
    uncles_hashes: string[];
    /** @example 16 */
    withdrawals_count: number;
  }

  export interface TokenTransfer {
    /** @example "0xf569ec751152b2f814001fc730f7797aa155e4bc3ba9cb6ba24bc2c8c9468c1a" */
    block_hash: string;
    from: AddressParam;
    /** @example "243" */
    log_index: string;
    /** @example "transfer" */
    method: string;
    /** @example "2023-07-03T20:09:59.000000Z" */
    timestamp: string;
    to: AddressParam;
    token: TokenInfo;
    total: TotalERC20 | TotalERC721 | TotalERC1155 | TotalERC1155Batch;
    /** @example "0x6662ad1ad2ea899e9e27832dc202fd2ef915a5d2816c1142e6933cff93f7c592" */
    tx_hash: string;
    /** @example "token_transfer" */
    type: string;
  }

  export interface RawTrace {
    action: RawTraceCallAction | RawTraceCreateAction | RawTraceSelfDestructAction;
    /** @example 0 */
    subtraces: number;
    /** @example [0,0] */
    traceAddress: number[];
    /** @example "call" */
    type: string;
    /** @example "Reverted" */
    error?: string;
    result?: RawTraceCallResult | RawTraceCreateResult;
  }

  export interface RawTraceCallAction {
    /** @example "call" */
    callType: string;
    /** @example "0x162e898bd0aacb578c8d5f8d6ca588c13d2a383f" */
    to: string;
    /** @example "0xf57b55b01b831e602e09674a4e5d69cbcf343f98" */
    from: string;
    /** @example "0x630cea8e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000041c25b36779231e71769118210c3eb64c0a9c7577b925b309af3183e13acc7cf30210493d13c8c6c3c0bd337d5e39e454fece0c301f0aedb6c43c7a37650ac83e71c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000019500050000f0add9e5dc02faeca12e9669f045685449d6b80a000000000000744359447362798334d3485c64d1e4870fde2ddc0d75f0b456250dc9990662a6f25808cc74a6d1131ea9000927c001018064382ae87cdd000000000000000000000000bab3cbdcbcc578445480a79ed80269c50bb5b71800000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000012000000000000000000000000351af1631aa5ea1ca62ad8a4e3cd87128d4d910800000000000000000000000000000000000000000000005b8decde02914ce837000000000000000000000000000000000000000000000000000000000000001e4d45444f4f5a412045636f73797374656d2076322e30206f6e2078446169000000000000000000000000000000000000000000000000000000000000000000044d445a41000000000000000000000000000000000000000000000000000000000000000000000000000000" */
    input: string;
    /** @example "0x25D3FC" */
    gas: string;
    /** @example "0x0" */
    value: string;
  }

  export interface RawTraceCreateAction {
    /** @example "0xf57b55b01b831e602e09674a4e5d69cbcf343f98" */
    from: string;
    /** @example "0x25D3FC" */
    gas: string;
    /** @example "0x630cea8e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000041c25b36779231e71769118210c3eb64c0a9c7577b925b309af3183e13acc7cf30210493d13c8c6c3c0bd337d5e39e454fece0c301f0aedb6c43c7a37650ac83e71c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000019500050000f0add9e5dc02faeca12e9669f045685449d6b80a000000000000744359447362798334d3485c64d1e4870fde2ddc0d75f0b456250dc9990662a6f25808cc74a6d1131ea9000927c001018064382ae87cdd000000000000000000000000bab3cbdcbcc578445480a79ed80269c50bb5b71800000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000012000000000000000000000000351af1631aa5ea1ca62ad8a4e3cd87128d4d910800000000000000000000000000000000000000000000005b8decde02914ce837000000000000000000000000000000000000000000000000000000000000001e4d45444f4f5a412045636f73797374656d2076322e30206f6e2078446169000000000000000000000000000000000000000000000000000000000000000000044d445a41000000000000000000000000000000000000000000000000000000000000000000000000000000" */
    init: string;
    /** @example "0x0" */
    value: string;
  }

  export interface RawTraceSelfDestructAction {
    /** @example "0xf57b55b01b831e602e09674a4e5d69cbcf343f98" */
    address: string;
    /** @example "0x25D3FC" */
    balance: string;
    /** @example "0x162e898bd0aacb578c8d5f8d6ca588c13d2a383f" */
    refundAddress: string;
  }

  export interface RawTraceCallResult {
    /** @example "0x25D3FC" */
    gasUsed: string;
    /** @example "0x0" */
    output: string;
  }

  export interface RawTraceCreateResult {
    /** @example "0xf57b55b01b831e602e09674a4e5d69cbcf343f98" */
    address: string;
    /** @example "0x25D3FC" */
    code: string;
    /** @example "0x25D3FC" */
    gasUsed: string;
  }

  export interface Log {
    address: AddressParam;
    /** @example "0xf90fdff5f174f7f29ebdf203d32cad2fe95376e41880bb9e731ca5eb0eef7941" */
    block_hash?: string;
    /** @example 8844586 */
    block_number?: number;
    /** @example "0x000000000000000000000000000000000000000000000000006a94d74f430000" */
    data: string;
    /** @example {"method_call":"Transfer(address indexed from, address indexed to, uint256 tokens)","method_id":"0x630cea8e","parameters":[{"name":"signature","type":"bytes","indexed?":true,"value":"0x0"},{"name":"message","type":"bytes","indexed?":false,"value":"0x01"}]} */
    decoded: DecodedInputLog;
    /** @example 35 */
    index: number;
    smart_contract: AddressParam;
    topics: string[];
    /** @example "0x08ea4d75ad0abe327a7fd368733eaeac43077989e635d800530d7906ebf3bd54" */
    tx_hash: string;
  }

  export interface InternalTransaction {
    /** @example 8844586 */
    block: number;
    created_contract: AddressParam;
    /** @example "reverted" */
    error: string;
    from: AddressParam;
    /** @example "351759" */
    gas_limit: string;
    /** @example 1 */
    index: number;
    /** @example true */
    success: boolean;
    /** @example "2023-04-17T10:37:12.000000Z" */
    timestamp: string;
    to: AddressParam;
    /** @example "0x08ea4d75ad0abe327a7fd368733eaeac43077989e635d800530d7906ebf3bd54" */
    transaction_hash: string;
    /** @example "call" */
    type: string;
    /** @example "30000000000000000" */
    value: string;
  }

  export interface Fee {
    /** @example "maximum | actual" */
    type: string;
    /** @example "9853224000000000" */
    value: string;
  }

  export interface Transaction {
    /** @example "2022-08-02T07:18:05.000000Z" */
    timestamp: string;
    fee: Fee;
    gas_limit: number;
    /**
     * @format int32
     * @example 23484035
     */
    block: number;
    /** @example "ok | error" */
    status: string;
    /** @example "transferFrom" */
    method: string;
    /** @example 1035 */
    confirmations: number;
    /** @example 2 */
    type: number;
    /** @example "1866.51" */
    exchange_rate: string;
    to: AddressParam;
    /** @example "1099596081903840" */
    tx_burnt_fee: string;
    /** @example "55357460102" */
    max_fee_per_gas: string;
    /** @example "Error: (Awaiting internal transactions for reason)" */
    result: string;
    /** @example "0x5d90a9da2b8da402b11bc92c8011ec8a62a2d59da5c7ac4ae0f73ec51bb73368" */
    hash: string;
    /** @example "26668595172" */
    gas_price: string;
    /** @example "2056916056308" */
    priority_fee: string;
    /** @example "26618801760" */
    base_fee_per_gas: string;
    from: AddressParam;
    token_transfers: TokenTransfer[];
    /** @example ["token_transfer","contract_creation","contract_call","token_creation","coin_transfer"] */
    tx_types: string[];
    /** @example "41309" */
    gas_used: string;
    created_contract: AddressParam;
    /** @example 117 */
    position: number;
    /** @example 115 */
    nonce: number;
    /** @example false */
    has_error_in_internal_txs: boolean;
    actions: TransactionAction[];
    decoded_input: DecodedInput;
    /** @example false */
    token_transfers_overflow: boolean;
    /** @example "0xa9059cbb000000000000000000000000ef8801eaf234ff82801821ffe2d78d60a0237f97000000000000000000000000000000000000000000000000000000003178cb80" */
    raw_input: string;
    /** @example "0" */
    value: string;
    /** @example "49793412" */
    max_priority_fee_per_gas: string;
    /** @example "Error: (Awaiting internal transactions for reason)" */
    revert_reason: string;
    /** @example [0,17479] */
    confirmation_duration: object;
    /** @example "private_tx_tag" */
    tx_tag: string;
  }

  export interface ExtendedRevertReasonAsMap {
    /** @example "4b415032303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e6365" */
    raw: string;
    code: number;
    /** @example "Reverted" */
    message: string;
  }

  /** @example {"inputs":[],"method_id":"2e64cec1","name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256","value":0}],"stateMutability":"view","type":"function"} */
  export type ReadMethodWithValue = object;

  /** @example {"inputs":[],"method_id":"f851a440","name":"admin","outputs":[{"internalType":"address","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"function"} */
  export type ReadMethodWithoutValue = object;

  /** @example {"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"} */
  export type WriteMethod = object;

  export interface DecodedInput {
    /** @example "transferFrom(address _from, address _to, uint256 _value)" */
    method_call: string;
    /** @example "23b872dd" */
    method_id: string;
    parameters: DecodedInputParameter[];
  }

  export interface DecodedInputParameter {
    /** @example "signature" */
    name: string;
    /** @example "bytes" */
    type: string;
    /** @example "0x0" */
    value: string;
  }

  export interface DecodedInputLog {
    /** @example "transferFrom(address _from, address _to, uint256 _value)" */
    method_call: string;
    /** @example "23b872dd" */
    method_id: string;
    parameters: DecodedInputLogParameter[];
  }

  export interface DecodedInputLogParameter {
    /** @example "signature" */
    name: string;
    /** @example "bytes" */
    type: string;
    /** @example "0x0" */
    value: string;
    indexed: boolean;
  }

  export interface AddressParam {
    /** @example "0xEb533ee5687044E622C69c58B1B12329F56eD9ad" */
    hash: string;
    /** @example "implementationName" */
    implementation_name: string;
    /** @example "contractName" */
    name: string;
    is_contract: boolean;
    private_tags: AddressTag[];
    watchlist_names: WatchlistName[];
    public_tags: AddressTag[];
    is_verified: boolean;
  }

  export interface AddressTag {
    /** @example "0xEb533ee5687044E622C69c58B1B12329F56eD9ad" */
    address_hash: string;
    /** @example "name to show" */
    display_name: string;
    /** @example "label" */
    label: string;
  }

  export interface WatchlistName {
    /** @example "name to show" */
    display_name: string;
    /** @example "label" */
    label: string;
  }

  export interface Address {
    /** @example "0xEb533ee5687044E622C69c58B1B12329F56eD9ad" */
    creator_address_hash?: string;
    /** @example "0x1f610ff9c1efad6b5a8bb6afcc0786cd7343f03f9a61e2544fcff908cedee924" */
    creation_tx_hash?: string;
    token?: TokenInfo;
    /** @example "10000000" */
    coin_balance?: string;
    /** @example "1.01" */
    exchange_rate?: string;
    /** @example "0xEb533ee5687044E622C69c58B1B12329F56eD9ad" */
    implementation_address?: string;
    /** @example 27656552 */
    block_number_balance_updated_at?: number;
    /** @example "0xEb533ee5687044E622C69c58B1B12329F56eD9ad" */
    hash: string;
    /** @example "implementationName" */
    implementation_name?: string;
    /** @example "contractName" */
    name?: string;
    is_contract?: boolean;
    private_tags?: AddressTag[];
    watchlist_names?: WatchlistName[];
    public_tags?: AddressTag[];
    is_verified?: boolean;
    has_beacon_chain_withdrawals?: boolean;
    has_custom_methods_read?: boolean;
    has_custom_methods_write?: boolean;
    has_decompiled_code?: boolean;
    has_logs?: boolean;
    has_methods_read?: boolean;
    has_methods_write?: boolean;
    has_methods_read_proxy?: boolean;
    has_methods_write_proxy?: boolean;
    has_token_transfers?: boolean;
    has_tokens?: boolean;
    has_validated_blocks?: boolean;
  }

  export type AddressWithTxCount = Address & {
    /** @example "1234" */
    tx_count: string;
  };

  export interface Reward {
    reward: number;
    /** @example "Miner Reward | Emission Reward | Chore Reward | Uncle Reward" */
    type: string;
  }

  export interface TransactionReward {
    /** @example ["reward"] */
    types: object;
    /** @example "500000000000000000" */
    emission_reward: string;
    /** @example "0x3169a7e9c513462403abb40eaa4fa51c5fbe1b908606e6eeef16232e308cb464" */
    block_hash: string;
    from: AddressParam;
    to: AddressParam;
  }

  export interface AddressCounters {
    /** @example "0" */
    transactions_count: string;
    /** @example "0" */
    token_transfers_count: string;
    /** @example "0" */
    gas_usage_count: string;
    /** @example "0" */
    validations_count: string;
  }

  export interface TokenBalance {
    token_instance?: NFTInstance;
    /** @example "10000" */
    value: string;
    /** @example "123" */
    token_id: string;
    token: Token;
  }

  export interface CoinBalanceHistoryEntry {
    /** @example "0x1f610ff9c1efad6b5a8bb6afcc0786cd7343f03f9a61e2544fcff908cedee924" */
    transaction_hash?: string;
    /** @example 1584930 */
    block_number: number;
    /** @example "2022-08-02T07:18:05.000000Z" */
    block_timestamp: string;
    /** @example "-234959404" */
    delta: string;
    /** @example "100232323" */
    value: string;
  }

  export interface CoinBalanceHistoryByDaysEntry {
    /** @example "2022-08-02" */
    date: string;
    /** @example "100232323" */
    value: number;
  }

  export interface Token {
    /** @example "Tether USD" */
    name: string;
    /** @example "16" */
    decimals: string;
    /** @example "USDT" */
    symbol: string;
    /** @example "0x394c399dbA25B99Ab7708EdB505d755B3aa29997" */
    address: string;
    /** @example "ERC-20" */
    type: string;
    /** @example 837494234523 */
    holders: number;
    /** @example "0.99" */
    exchange_rate: string;
    /** @example "10000000" */
    total_supply: string;
  }

  export interface TotalERC20 {
    /** @example "18" */
    decimals: string;
    /** @example "1000" */
    value: string;
  }

  export interface TotalERC721 {
    /** @example "1" */
    token_id: string;
  }

  export interface TotalERC1155 {
    /** @example "1" */
    token_id: string;
    /** @example null */
    decimals: string;
    /** @example "1000" */
    value: string;
  }

  export type TotalERC1155Batch = TotalERC1155[];

  export interface Holder {
    address: AddressParam;
    /** @example "10000" */
    value: string;
    /** @example "10000" */
    token_id?: string;
    token: TokenInfo;
  }

  export interface NFTInstance {
    is_unique: boolean;
    /** @example "431" */
    id: string;
    /** @example "0x394c399dbA25B99Ab7708EdB505d755B3aa29997" */
    holder_address_hash?: string;
    /** @example "example.com/picture.png" */
    image_url?: string;
    /** @example "example.com/video.mp4" */
    animation_url?: string;
    /** @example "d-app.com" */
    external_app_url?: string;
    /** @example {"year":2023,"tags":["poap","event"],"name":"Social Listening Committee #2 Attendees","image_url":"https://assets.poap.xyz/chanel-poap-4c-2023-logo-1675083420470.png","home_url":"https://app.poap.xyz/token/6292128","external_url":"https://api.poap.tech/metadata/99010/6292128","description":"This is the POAP for attendees of the second Social Listening Committee.","attributes":[{"value":"01-Feb-2023","trait_type":"startDate"},{"value":"01-Feb-2023","trait_type":"endDate"},{"value":"false","trait_type":"virtualEvent"},{"value":"Paris","trait_type":"city"},{"value":"France","trait_type":"country"},{"value":"https://www.chanel.com","trait_type":"eventURL"}]} */
    metadata?: object;
    owner: AddressParam;
    token: TokenInfo;
  }

  export interface AddressNFTInstance {
    is_unique: boolean;
    /** @example "431" */
    id: string;
    /** @example "0x394c399dbA25B99Ab7708EdB505d755B3aa29997" */
    holder_address_hash?: string;
    /** @example "example.com/picture.png" */
    image_url?: string;
    /** @example "example.com/video.mp4" */
    animation_url?: string;
    /** @example "d-app.com" */
    external_app_url?: string;
    /** @example {"year":2023,"tags":["poap","event"],"name":"Social Listening Committee #2 Attendees","image_url":"https://assets.poap.xyz/chanel-poap-4c-2023-logo-1675083420470.png","home_url":"https://app.poap.xyz/token/6292128","external_url":"https://api.poap.tech/metadata/99010/6292128","description":"This is the POAP for attendees of the second Social Listening Committee.","attributes":[{"value":"01-Feb-2023","trait_type":"startDate"},{"value":"01-Feb-2023","trait_type":"endDate"},{"value":"false","trait_type":"virtualEvent"},{"value":"Paris","trait_type":"city"},{"value":"France","trait_type":"country"},{"value":"https://www.chanel.com","trait_type":"eventURL"}]} */
    metadata?: object;
    owner: AddressParam;
    token: TokenInfo;
    /** @example "ERC-721" */
    token_type: string;
    /** @example "1" */
    value: string;
  }

  export interface AddressNFTInstanceCollection {
    is_unique: boolean;
    /** @example "431" */
    id: string;
    /** @example "0x394c399dbA25B99Ab7708EdB505d755B3aa29997" */
    holder_address_hash?: string;
    /** @example "example.com/picture.png" */
    image_url?: string;
    /** @example "example.com/video.mp4" */
    animation_url?: string;
    /** @example "d-app.com" */
    external_app_url?: string;
    /** @example {"year":2023,"tags":["poap","event"],"name":"Social Listening Committee #2 Attendees","image_url":"https://assets.poap.xyz/chanel-poap-4c-2023-logo-1675083420470.png","home_url":"https://app.poap.xyz/token/6292128","external_url":"https://api.poap.tech/metadata/99010/6292128","description":"This is the POAP for attendees of the second Social Listening Committee.","attributes":[{"value":"01-Feb-2023","trait_type":"startDate"},{"value":"01-Feb-2023","trait_type":"endDate"},{"value":"false","trait_type":"virtualEvent"},{"value":"Paris","trait_type":"city"},{"value":"France","trait_type":"country"},{"value":"https://www.chanel.com","trait_type":"eventURL"}]} */
    metadata?: object;
    owner: AddressParam;
    /** @example null */
    token?: object;
    /** @example "ERC-721" */
    token_type: string;
    /** @example "1" */
    value: string;
  }

  export interface AddressNFTCollection {
    token: TokenInfo;
    /** @example "1" */
    amount?: string;
    token_instances: AddressNFTInstanceCollection[];
  }

  export interface SmartContract {
    /** @example "0x394c399dbA25B99Ab7708EdB505d755B3aa29997" */
    verified_twin_address_hash?: string;
    is_verified?: boolean;
    is_changed_bytecode?: boolean;
    is_partially_verified?: boolean;
    is_fully_verified?: boolean;
    is_verified_via_sourcify?: boolean;
    is_verified_via_eth_bytecode_db?: boolean;
    is_vyper_contract?: boolean;
    is_self_destructed?: boolean;
    can_be_visualized_via_sol2uml?: boolean;
    /** @example "0x394c399dbA25B99Ab7708EdB505d755B3aa29997" */
    minimal_proxy_address_hash?: string;
    /** @example "https://sourcify.repo.com/100/link_to_a_contract_at_sourcify" */
    sourcify_repo_url?: string;
    /** @example "Cryptostamp3L2" */
    name?: string;
    /** @example false */
    optimization_enabled?: boolean;
    /** @example 200 */
    optimizations_runs?: number;
    /** @example "v0.8.4+commit.c7e474f2" */
    compiler_version?: string;
    /** @example "default" */
    evm_version?: string;
    /** @example "2021-06-02T17:54:17.116055Z" */
    verified_at?: string;
    /** @example "[{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_bridgeDataAddress","internalType":"address"},{"type":"uint256","name":"_finalSupply","internalType":"uint256"},{"type":"uint256[5]","name":"_totalColorSupply","internalType":"uint256[5]"}]}]" */
    abi?: string;
    /** @example "contract A {}" */
    source_code?: string;
    /** @example "contract.sol" */
    file_path?: string;
    /** @example {"compilationTarget":{"@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol":"ERC1967Proxy"},"evmVersion":"london","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[]} */
    compiler_settings?: object;
    /** @example "0x01" */
    constructor_args?: string;
    additional_sources?: ContractSource[];
    decoded_constructor_args?: ConstructorArguments[];
    /** @example "0x01" */
    deployed_bytecode?: string;
    /** @example "0x02" */
    creation_bytecode?: string;
    external_libraries?: ExternalLibrary[];
    /** @example "solidity | vyper | yul" */
    language?: string;
  }

  export interface ExternalLibrary {
    /** @example "MathLib" */
    name: string;
    /** @example "0xF61f5c4a3664501F499A9289AaEe76a709CE536e" */
    address_hash: string;
  }

  export interface ContractSource {
    /** @example "contracts/erc-20.sol" */
    file_path?: string;
    /** @example "pragma solidity ^0.8.0; \n contract A {}" */
    source_code?: string;
  }

  /** @example ["0x2a3885b3f0c98f3e36334d4fa7beda53cb0ae095",{"internalType":"address","name":"_logic","type":"address"}] */
  export type ConstructorArguments = object;

  export interface TokenInfo {
    /** @example "83606435600.3635" */
    circulating_market_cap: string;
    /** @example "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png" */
    icon_url: string;
    /** @example "Tether USD" */
    name: string;
    /** @example "6" */
    decimals: string;
    /** @example "USDT" */
    symbol: string;
    /** @example "0x394c399dbA25B99Ab7708EdB505d755B3aa29997" */
    address: string;
    /** @example "ERC-20" */
    type: string;
    /** @example "837494234523" */
    holders: string;
    /** @example "0.99" */
    exchange_rate: string;
    /** @example "10000000" */
    total_supply: string;
  }

  export interface Argument {
    name?: string;
    /** @example "uint256" */
    type?: string;
    /** @example "100000" */
    value?: string;
  }

  export interface SearchResultRedirect {
    /** @example "0xEb533ee5687044E622C69c58B1B12329F56eD9ad" */
    parameter: string;
    redirect: boolean;
    /** @example "address | block | transaction" */
    type: string;
  }

  export interface SearchResultToken {
    /** @example "0xdAC17F958D2ee523a2206206994597C13D831ec7" */
    address: string;
    /** @example "/address/0xdAC17F958D2ee523a2206206994597C13D831ec7" */
    address_url: string;
    /** @example "0.999813" */
    exchange_rate: string;
    /** @example "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png" */
    icon_url: string;
    /** @example true */
    is_smart_contract_verified: boolean;
    /** @example "Tether USD" */
    name: string;
    /** @example "USDT" */
    symbol: string;
    /** @example "ERC-20" */
    token_type: string;
    /** @example "/token/0xdAC17F958D2ee523a2206206994597C13D831ec7" */
    token_url: string;
    /** @example "39030615894320966" */
    total_supply: string;
    /** @example "token" */
    type: string;
  }

  export interface SearchResultAddressOrContract {
    /** @example "0xe2FBdeADC82c71C1b8bFf9CA4f9E7666224A362c" */
    address: string;
    /** @example true */
    is_smart_contract_verified: boolean;
    /** @example "Name" */
    name: string;
    /** @example "address|contract" */
    type: string;
    /** @example "/xdai/mainnet/address/0xc1c1031e4A44B98707203480029e6576CB3267e3" */
    url: string;
  }

  export interface SearchResultBlock {
    /** @example "0xba83e9ba0b43e8d112a07fdab08d53f473d2b7fb0e585bd437ae739933db203e" */
    block_hash: string;
    /** @example 24816691 */
    block_number: number;
    /** @example "2022-10-31T07:18:05.000000Z" */
    timestamp: string;
    /** @example "block" */
    type: string;
    /** @example "/xdai/mainnet/block/0xba83e9ba0b43e8d112a07fdab08d53f473d2b7fb0e585bd437ae739933db203e" */
    url: string;
  }

  export interface SearchResultTransaction {
    /** @example "2022-10-31T07:18:05.000000Z" */
    timestamp: string;
    /** @example "0xe38c6772f33edfbd218f59853befe18391cb786f911fb6c0b00ed6dd72ef6e69" */
    tx_hash: string;
    /** @example "transaction" */
    type: string;
    /** @example "/xdai/mainnet/tx/0xe38c6772f33edfbd218f59853befe18391cb786f911fb6c0b00ed6dd72ef6e69" */
    url: string;
  }

  export interface IndexingStatus {
    finished_indexing: boolean;
    finished_indexing_blocks: boolean;
    /** @example "1.0" */
    indexed_blocks_ratio: string;
    /** @example "1.0" */
    indexed_internal_transactions_ratio: string;
  }

  export interface StatsResponse {
    /** @example "508700" */
    total_blocks: string;
    /** @example "982340" */
    total_addresses: string;
    /** @example "1699427" */
    total_transactions: string;
    /** @example 25000 */
    average_block_time: number;
    /** @example "0.00254957" */
    coin_price: string;
    /** @example "0" */
    total_gas_used: string;
    /** @example "622" */
    transactions_today: string;
    /** @example "49063630" */
    gas_used_today: string;
    /** @example {"average":10,"fast":10,"slow":10} */
    gas_prices: object;
    /** @example "10.1" */
    static_gas_price: string;
    /** @example "420471.10604559750644" */
    market_cap: string;
    /** @example 40.2142 */
    network_utilization_percentage: number;
  }

  export interface MarketChartItem {
    /** @example "2022-10-31" */
    date: string;
    /** @example "0.00254915" */
    closing_price: string;
    /** @example "420471.10604559750644" */
    market_cap: string;
  }

  export interface TransactionChartItem {
    /** @example "2022-10-31" */
    date: string;
    /** @example 622 */
    tx_count: number;
  }

  export interface TokenCounters {
    /** @example "100" */
    token_holders_count: string;
    /** @example "1000" */
    transfers_count: string;
  }

  export interface RecaptchaBody {
    /** @example "123" */
    recaptcha_response: string;
  }

  export interface ReadMethodQueryBody {
    /** @example [1123,"0xBb36c792B9B45Aaf8b848A1392B0d6559202729E"] */
    args: any[];
    /** @example "ab470f05" */
    method_id: string;
    /** @example "0xBb36c792B9B45Aaf8b848A1392B0d6559202729E" */
    from?: string;
    /** @example "proxy | regular" */
    contract_type?: string;
  }

  export interface ReadMethodResponse {
    is_error: boolean;
    result: ExtendedRevertReasonAsMap | Error | DecodedInput | CodeAndMessage | OutputAndNames;
  }

  export interface CodeAndMessage {
    code: number;
    /** @example "Reverted" */
    message: string;
  }

  export interface Error {
    /** @example "Some error" */
    error: string;
  }

  export interface OutputAndNames {
    /** @example [{"type":"uint256","value":0}] */
    output: any[];
    /** @example [null] */
    names: any[];
  }

  export interface StateChange {
    token?: TokenInfo;
    /** @example "coin | token" */
    type: string;
    is_miner: boolean;
    address: AddressParam;
    /** @example "100000000" */
    balance_before?: string;
    /** @example "100000000" */
    balance_after?: string;
    /** @example null */
    token_id?: string;
    change?: NFTChangesArray | ERC20Or1155OrCoinChange;
  }

  /** @example "-10000000" */
  export type ERC20Or1155OrCoinChange = string;

  export type NFTChangesArray = NFTChange[];

  export interface NFTChange {
    /** @example "from | to" */
    direction: string;
    total: TotalERC721;
  }

  export interface SmartContractForList {
    address: AddressParam;
    /** @example "10000" */
    coin_balance: string;
    /** @example "v0.5.10+commit.5a6ea5b1" */
    compiler_version: string;
    /** @example "vyper | yul | solidity" */
    language: string;
    has_constructor_args: boolean;
    optimization_enabled: boolean;
    tx_count: number;
    /** @example "2022-03-05T11:40:29.087000Z" */
    verified_at: string;
    /** @example 1000000000.0001 */
    market_cap?: number;
  }

  export interface Withdrawal {
    /** @example 1 */
    index: number;
    /** @example "1000000000000000000" */
    amount: string;
    /** @example 1 */
    validator_index: number;
    receiver?: AddressParam;
    /** @example 1 */
    block_number?: number;
    /** @example "2023-06-20T07:55:00.000000Z" */
    timestamp?: string;
  }

  export type TransactionAction =
    | TransactionActionAaveV3LiquidationCall
    | TransactionActionAaveV3BSWRF
    | TransactionActionAaveV3EnableDisableCollateral
    | TransactionActionUniswapV3MintNFT
    | TransactionActionUniswapV3BCS;

  export interface TransactionActionAaveV3LiquidationCall {
    /** @example {"debt_amount":"1.289548595490270429","debt_symbol":"AAVE","debt_address":"0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9","collateral_amount":"110.824768","collateral_symbol":"USDC","collateral_address":"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","block_number":1} */
    data: object;
    /** @example "aave_v3" */
    protocol: string;
    /** @example "liquidation_call" */
    type: string;
  }

  export interface TransactionActionAaveV3BSWRF {
    /** @example {"amount":"1.289548595490270429","symbol":"AAVE","address":"0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9","block_number":1} */
    data: object;
    /** @example "aave_v3" */
    protocol: string;
    /** @example "borrow | supply | withdraw | repay | flash_loan" */
    type: string;
  }

  export interface TransactionActionAaveV3EnableDisableCollateral {
    /** @example {"symbol":"AAVE","address":"0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9","block_number":1} */
    data: object;
    /** @example "aave_v3" */
    protocol: string;
    /** @example "enable_collateral | disable_collateral" */
    type: string;
  }

  export interface TransactionActionUniswapV3MintNFT {
    /** @example {"name":"Uniswap V3: Positions NFT","symbol":"UNI-V3-POS","address":"0x1F98431c8aD98523631AE4a59f267346ea31F984","to":"0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9","ids":["1","2"],"block_number":1} */
    data: object;
    /** @example "uniswap_v3" */
    protocol: string;
    /** @example "mint_nft" */
    type: string;
  }

  export interface TransactionActionUniswapV3BCS {
    /** @example {"address0":"0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9","address1":"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","amount0":"1.289548595490270429","amount1":"110.824768","symbol0":"AAVE","symbol1":"USDC"} */
    data: object;
    /** @example "uniswap_v3" */
    protocol: string;
    /** @example "burn | collect | swap" */
    type: string;
  }

  export interface SearchData {
    items: (SearchResultToken | SearchResultAddressOrContract | SearchResultBlock | SearchResultTransaction)[];
    /** @example {"address_hash":"0x052Ad78E3aA0b0F2D3912FD3b50a9a289CF2f7Aa","block_hash":null,"holder_count":548,"inserted_at":"2021-12-07T08:39:01.062253Z","item_type":"token","items_count":50,"name":"RealToken S 13245 Monica St Detroit MI","q":"1","tx_hash":null} */
    next_page_params: object;
  }

  export type SearchRedirectData = SearchResultRedirect;

  export interface GetTxsData {
    items: Transaction[];
    /** @example {"block_number":27170298,"index":0,"items_count":50} */
    next_page_params: object;
  }

  export interface GetBlocksData {
    items: Block[];
    /** @example {"block_number":27729304,"items_count":50} */
    next_page_params: object;
  }

  export type GetMainPageTxsData = Transaction[];

  export type GetMainPageTokensData = Block[];

  export type GetIndexingStatusData = IndexingStatus;

  export type GetStatsData = StatsResponse;

  export interface GetTxsChartData {
    chart_data: TransactionChartItem[];
  }

  export interface GetMarketChartData {
    /** @example "164918857.718061" */
    available_supply: string;
    chart_data: MarketChartItem[];
  }

  export type GetTxData = Transaction;

  export interface GetTokenTransfersData {
    items: TokenTransfer[];
    /** @example {"block_number":27350206,"index":1,"items_count":50,"transaction_hash":"0xa3b401d6f3124c9d1528cd8d4b692f523d86fd88e48c391ffe9c67e4436ae5ca"} */
    next_page_params: object;
  }

  export interface GetInternalTxsData {
    items: InternalTransaction[];
    /** @example {"block_number":27350206,"index":1,"items_count":50,"transaction_index":0} */
    next_page_params: object;
  }

  export interface GetLogsData {
    items: Log[];
    /** @example {"index":0,"items_count":50,"block_number":2} */
    next_page_params: object;
  }

  export type GetRawTraceData = RawTrace[];

  export interface GetStateChangesData {
    items: StateChange[];
    /** @example {"items_count":1,"state_changes":null} */
    next_page_params: object;
  }

  export type GetBlockData = Block;

  export interface GetBlockTxsData {
    items: Transaction[];
    /** @example {"block_number":27736955,"index":4,"items_count":50} */
    next_page_params: object;
  }

  export interface GetBlockWithdrawalsData {
    items: Withdrawal[];
    /** @example {"index":1,"items_count":50} */
    next_page_params: object;
  }

  export interface GetAddressesData {
    /** @example "0.01" */
    exchange_rate: string;
    /** @example "100000000" */
    total_supply: string;
    items: AddressWithTxCount[];
    /** @example {"fetched_coin_balance":"269536604956070000000","hash":"0xf74769d9ffe1cd17f20b283995cf9e7fa2a262ed","items_count":50} */
    next_page_params: object;
  }

  export type GetAddressData = Address;

  export type GetAddressCountersData = AddressCounters;

  export interface GetAddressTxsData {
    items: Transaction[];
    /** @example {"block_number":27736955,"index":4,"items_count":50} */
    next_page_params: object;
  }

  export interface GetAddressTokenTransfersData {
    items: TokenTransfer[];
    /** @example {"block_number":27736955,"index":4} */
    next_page_params: object;
  }

  export interface GetAddressInternalTxsData {
    items: InternalTransaction[];
    /** @example {"block_number":27625575,"index":0,"items_count":50,"transaction_index":0} */
    next_page_params: object;
  }

  export interface GetAddressLogsData {
    items: Log[];
    /** @example {"block_number":27736955,"index":68,"items_count":50} */
    next_page_params: object;
  }

  export interface GetAddressBlocksValidatedData {
    items: Block[];
    /** @example {"block_number":27736955,"items_count":50} */
    next_page_params: object;
  }

  export type GetAddressTokenBalancesData = TokenBalance[];

  export interface GetAddressTokensData {
    items: TokenBalance[];
    /** @example {"items_count":50,"token_name":null,"token_type":"ERC-1155","value":14} */
    next_page_params: object;
  }

  export interface GetAddressCoinBalanceHistoryData {
    items: CoinBalanceHistoryEntry[];
    /** @example {"block_number":27736955,"items_count":50} */
    next_page_params: object;
  }

  export type GetAddressCoinBalanceHistoryByDayData = CoinBalanceHistoryByDaysEntry[];

  export interface GetAddressWithdrawalsData {
    items: Withdrawal[];
    /** @example {"index":1,"items_count":50} */
    next_page_params: object;
  }

  export interface GetAddressNftData {
    items: AddressNFTInstance[];
    /** @example {"token_contract_address_hash":"0xb81afe27c103bcd42f4026cf719af6d802928765","token_id":"1011","token_type":"ERC-721"} */
    next_page_params: object;
  }

  export interface GetAddressNftCollectionsData {
    items: AddressNFTCollection[];
    /** @example {"token_contract_address_hash":"0xb81afe27c103bcd42f4026cf719af6d802928765","token_type":"ERC-721"} */
    next_page_params: object;
  }

  export interface GetTokensListData {
    items: TokenInfo[];
    /** @example {"contract_address_hash":"0x68749665ff8d2d112fa859aa293f07a622782f38","holder_count":1011,"is_name_null":false,"items_count":50,"market_cap":"482534473.2170469","name":"Tether Gold"} */
    next_page_params: object;
  }

  export type GetTokenData = TokenInfo;

  export interface GetTokenTokenTransfersData {
    items: TokenTransfer[];
    /** @example {"block_number":27736955,"index":61} */
    next_page_params: object;
  }

  export interface GetTokenHoldersData {
    items: Holder[];
    /** @example {"items_count":2,"value":790000000000000000000} */
    next_page_params: object;
  }

  export type GetTokenCountersData = TokenCounters;

  export interface GetNftInstancesData {
    items: NFTInstance[];
    /** @example {"unique_token":97464} */
    next_page_params: object;
  }

  export type GetNftInstanceData = NFTInstance;

  export interface GetNftInstanceTransfersData {
    items: TokenTransfer[];
    /** @example {"block_number":27736955,"index":61,"token_id":50} */
    next_page_params: object;
  }

  export interface GetTokenInstanceHoldersData {
    items: Holder[];
    /** @example {"value":790000000000000000000,"token_id":"953848","items_count":50} */
    next_page_params: object;
  }

  export interface GetNftInstanceTransfersCountData {
    /** @example 10 */
    transfers_count: number;
  }

  export interface RefetchTokenInstanceMetadataData {
    /** @example "OK" */
    message?: string;
  }

  export interface GetSmartContractsData {
    items: SmartContractForList[];
    /** @example {"items_count":50,"smart_contract_id":46} */
    next_page_params: object;
  }

  export interface GetSmartContractsCountersData {
    /** @example "12" */
    new_smart_contracts_24h: string;
    /** @example "11" */
    new_verified_smart_contracts_24h: string;
    /** @example "20" */
    smart_contracts: string;
    /** @example "15" */
    verified_smart_contracts: string;
  }

  export type GetSmartContractData = SmartContract;

  export type GetReadMethodsData = (ReadMethodWithValue | ReadMethodWithoutValue)[];

  export type GetReadMethodsProxyData = (ReadMethodWithValue | ReadMethodWithoutValue)[];

  export type GetWriteMethodsData = WriteMethod[];

  export type GetWriteMethodsProxyData = WriteMethod[];

  export type QueryReadMethodData = ReadMethodResponse[];

  export interface GetJsonRpcUrlData {
    /** @example "https://core.poa.network" */
    json_rpc_url: string;
  }

  export interface GetWithdrawalsData {
    items: Withdrawal[];
    /** @example {"index":1,"items_count":50} */
    next_page_params: object;
  }

  export type QueryParamsType = Record<string | number, any>;
  export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

  export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
  }

  export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

  export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
  }

  export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
  }

  type CancelToken = Symbol | string | number;

  export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
  }

  export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = "https://www.shibariumscan.io/api/v2/";
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private abortControllers = new Map<CancelToken, AbortController>();
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

    private baseApiParams: RequestParams = {
      credentials: "same-origin",
      headers: {},
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
      Object.assign(this, apiConfig);
    }

    public setSecurityData = (data: SecurityDataType | null) => {
      this.securityData = data;
    };

    protected encodeQueryParam(key: string, value: any) {
      const encodedKey = encodeURIComponent(key);
      return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
      return this.encodeQueryParam(key, query[key]);
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
      const value = query[key];
      return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
      const query = rawQuery || {};
      const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
      return keys
        .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
        .join("&");
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
      const queryString = this.toQueryString(rawQuery);
      return queryString ? `?${queryString}` : "";
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
      [ContentType.Json]: (input: any) =>
        input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
      [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
      [ContentType.FormData]: (input: any) =>
        Object.keys(input || {}).reduce((formData, key) => {
          const property = input[key];
          formData.append(
            key,
            property instanceof Blob
              ? property
              : typeof property === "object" && property !== null
                ? JSON.stringify(property)
                : `${property}`,
          );
          return formData;
        }, new FormData()),
      [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };

    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
      return {
        ...this.baseApiParams,
        ...params1,
        ...(params2 || {}),
        headers: {
          ...(this.baseApiParams.headers || {}),
          ...(params1.headers || {}),
          ...((params2 && params2.headers) || {}),
        },
      };
    }

    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
      if (this.abortControllers.has(cancelToken)) {
        const abortController = this.abortControllers.get(cancelToken);
        if (abortController) {
          return abortController.signal;
        }
        return void 0;
      }

      const abortController = new AbortController();
      this.abortControllers.set(cancelToken, abortController);
      return abortController.signal;
    };

    public abortRequest = (cancelToken: CancelToken) => {
      const abortController = this.abortControllers.get(cancelToken);

      if (abortController) {
        abortController.abort();
        this.abortControllers.delete(cancelToken);
      }
    };

    public request = async <T = any, E = any>({
      body,
      secure,
      path,
      type,
      query,
      format,
      baseUrl,
      cancelToken,
      ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
      const secureParams =
        ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
          this.securityWorker &&
          (await this.securityWorker(this.securityData))) ||
        {};
      const requestParams = this.mergeRequestParams(params, secureParams);
      const queryString = query && this.toQueryString(query);
      const payloadFormatter = this.contentFormatters[type || ContentType.Json];
      const responseFormat = format || requestParams.format;

      return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
      }).then(async (response) => {
        const r = response.clone() as HttpResponse<T, E>;
        r.data = null as unknown as T;
        r.error = null as unknown as E;

        const data = !responseFormat
          ? r
          : await response[responseFormat]()
              .then((data) => {
                if (r.ok) {
                  r.data = data;
                } else {
                  r.error = data;
                }
                return r;
              })
              .catch((e) => {
                r.error = e;
                return r;
              });

        if (cancelToken) {
          this.abortControllers.delete(cancelToken);
        }

        if (!response.ok) throw data;
        return data;
      });
    };
  }

  /**
   * @title BlockScout API
   * @version 1.0.0
   * @license Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0.html)
   * @baseUrl https://www.shibariumscan.io/api/v2/
   * @contact <you@your-company.com>
   *
   * API for BlockScout web app
   */
  export class BlockscoutApi<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    search = {
      /**
       * No description
       *
       * @name Search
       * @summary search
       * @request GET:/search
       */
      search: (
        query?: {
          /** @example "USDT" */
          q?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<SearchData, void>({
          path: `/search`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name SearchRedirect
       * @summary search redirect
       * @request GET:/search/check-redirect
       */
      searchRedirect: (
        query?: {
          /** @example "USDT" */
          q?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<SearchRedirectData, void>({
          path: `/search/check-redirect`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),
    };
    transactions = {
      /**
       * No description
       *
       * @name GetTxs
       * @summary get txs
       * @request GET:/transactions
       */
      getTxs: (
        query?: {
          /** @example "pending | validated" */
          filter?: string;
          /** @example "token_transfer,contract_creation,contract_call,coin_transfer,token_creation" */
          type?: string;
          /** @example "approve,transfer,multicall,mint,commit" */
          method?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetTxsData, void>({
          path: `/transactions`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetTx
       * @summary get tx info
       * @request GET:/transactions/{transaction_hash}
       */
      getTx: (transactionHash: string, params: RequestParams = {}) =>
        this.request<GetTxData, void>({
          path: `/transactions/${transactionHash}`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetTokenTransfers
       * @summary get token transfers
       * @request GET:/transactions/{transaction_hash}/token-transfers
       */
      getTokenTransfers: (
        transactionHash: string,
        query?: {
          /** @example "ERC-20,ERC-721,ERC-1155" */
          type?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetTokenTransfersData, void>({
          path: `/transactions/${transactionHash}/token-transfers`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetInternalTxs
       * @summary get internal txs
       * @request GET:/transactions/{transaction_hash}/internal-transactions
       */
      getInternalTxs: (transactionHash: string, params: RequestParams = {}) =>
        this.request<GetInternalTxsData, void>({
          path: `/transactions/${transactionHash}/internal-transactions`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetLogs
       * @summary get logs
       * @request GET:/transactions/{transaction_hash}/logs
       */
      getLogs: (transactionHash: string, params: RequestParams = {}) =>
        this.request<GetLogsData, void>({
          path: `/transactions/${transactionHash}/logs`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetRawTrace
       * @summary get raw trace
       * @request GET:/transactions/{transaction_hash}/raw-trace
       */
      getRawTrace: (transactionHash: string, params: RequestParams = {}) =>
        this.request<GetRawTraceData, void>({
          path: `/transactions/${transactionHash}/raw-trace`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetStateChanges
       * @summary get state changes
       * @request GET:/transactions/{transaction_hash}/state-changes
       */
      getStateChanges: (transactionHash: string, params: RequestParams = {}) =>
        this.request<GetStateChangesData, void>({
          path: `/transactions/${transactionHash}/state-changes`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    blocks = {
      /**
       * No description
       *
       * @name GetBlocks
       * @summary get blocks
       * @request GET:/blocks
       */
      getBlocks: (
        query?: {
          /** @example "block | uncle | reorg" */
          type?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetBlocksData, void>({
          path: `/blocks`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetBlock
       * @summary get block info
       * @request GET:/blocks/{block_number_or_hash}
       */
      getBlock: (blockNumberOrHash: string, params: RequestParams = {}) =>
        this.request<GetBlockData, void>({
          path: `/blocks/${blockNumberOrHash}`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetBlockTxs
       * @summary get block txs
       * @request GET:/blocks/{block_number_or_hash}/transactions
       */
      getBlockTxs: (blockNumberOrHash: string, params: RequestParams = {}) =>
        this.request<GetBlockTxsData, void>({
          path: `/blocks/${blockNumberOrHash}/transactions`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetBlockWithdrawals
       * @summary get block withdrawals
       * @request GET:/blocks/{block_number_or_hash}/withdrawals
       */
      getBlockWithdrawals: (blockNumberOrHash: string, params: RequestParams = {}) =>
        this.request<GetBlockWithdrawalsData, void>({
          path: `/blocks/${blockNumberOrHash}/withdrawals`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    mainPage = {
      /**
       * No description
       *
       * @name GetMainPageTxs
       * @summary get main page txs
       * @request GET:/main-page/transactions
       */
      getMainPageTxs: (params: RequestParams = {}) =>
        this.request<GetMainPageTxsData, any>({
          path: `/main-page/transactions`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetMainPageTokens
       * @summary get main page blocks
       * @request GET:/main-page/blocks
       */
      getMainPageTokens: (params: RequestParams = {}) =>
        this.request<GetMainPageTokensData, any>({
          path: `/main-page/blocks`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetIndexingStatus
       * @summary get indexing status
       * @request GET:/main-page/indexing-status
       */
      getIndexingStatus: (params: RequestParams = {}) =>
        this.request<GetIndexingStatusData, any>({
          path: `/main-page/indexing-status`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    stats = {
      /**
       * No description
       *
       * @name GetStats
       * @summary get stats counters
       * @request GET:/stats
       */
      getStats: (params: RequestParams = {}) =>
        this.request<GetStatsData, any>({
          path: `/stats`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetTxsChart
       * @summary get txs chart
       * @request GET:/stats/charts/transactions
       */
      getTxsChart: (params: RequestParams = {}) =>
        this.request<GetTxsChartData, any>({
          path: `/stats/charts/transactions`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetMarketChart
       * @summary get market chart
       * @request GET:/stats/charts/market
       */
      getMarketChart: (params: RequestParams = {}) =>
        this.request<GetMarketChartData, any>({
          path: `/stats/charts/market`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    addresses = {
      /**
       * No description
       *
       * @name GetAddresses
       * @summary get native coin holders list
       * @request GET:/addresses
       */
      getAddresses: (params: RequestParams = {}) =>
        this.request<GetAddressesData, void>({
          path: `/addresses`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddress
       * @summary get address info
       * @request GET:/addresses/{address_hash}
       */
      getAddress: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetAddressData, void>({
          path: `/addresses/${addressHash}`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressCounters
       * @summary get address counters
       * @request GET:/addresses/{address_hash}/counters
       */
      getAddressCounters: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetAddressCountersData, void>({
          path: `/addresses/${addressHash}/counters`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressTxs
       * @summary get address txs
       * @request GET:/addresses/{address_hash}/transactions
       */
      getAddressTxs: (
        addressHash: string,
        query?: {
          /** @example "to | from" */
          filter?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetAddressTxsData, void>({
          path: `/addresses/${addressHash}/transactions`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressTokenTransfers
       * @summary get address token transfers
       * @request GET:/addresses/{address_hash}/token-transfers
       */
      getAddressTokenTransfers: (
        addressHash: string,
        query?: {
          /** @example "ERC-20,ERC-721,ERC-1155" */
          type?: string;
          /** @example "to | from" */
          filter?: string;
          /** @example "0xb81afe27c103bcd42f4026cf719af6d802928765" */
          token?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetAddressTokenTransfersData, void>({
          path: `/addresses/${addressHash}/token-transfers`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressInternalTxs
       * @summary get address internal txs
       * @request GET:/addresses/{address_hash}/internal-transactions
       */
      getAddressInternalTxs: (
        addressHash: string,
        query?: {
          /** @example "to | from" */
          filter?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetAddressInternalTxsData, void>({
          path: `/addresses/${addressHash}/internal-transactions`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressLogs
       * @summary get address logs
       * @request GET:/addresses/{address_hash}/logs
       */
      getAddressLogs: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetAddressLogsData, void>({
          path: `/addresses/${addressHash}/logs`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressBlocksValidated
       * @summary get blocks validated by address
       * @request GET:/addresses/{address_hash}/blocks-validated
       */
      getAddressBlocksValidated: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetAddressBlocksValidatedData, void>({
          path: `/addresses/${addressHash}/blocks-validated`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressTokenBalances
       * @summary get all tokens balances for the address
       * @request GET:/addresses/{address_hash}/token-balances
       */
      getAddressTokenBalances: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetAddressTokenBalancesData, void>({
          path: `/addresses/${addressHash}/token-balances`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressTokens
       * @summary token balances with filtering and pagination
       * @request GET:/addresses/{address_hash}/tokens
       */
      getAddressTokens: (
        addressHash: string,
        query?: {
          /** @example "ERC-20,ERC-721,ERC-1155" */
          type?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetAddressTokensData, void>({
          path: `/addresses/${addressHash}/tokens`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressCoinBalanceHistory
       * @summary get address coin balance history
       * @request GET:/addresses/{address_hash}/coin-balance-history
       */
      getAddressCoinBalanceHistory: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetAddressCoinBalanceHistoryData, void>({
          path: `/addresses/${addressHash}/coin-balance-history`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressCoinBalanceHistoryByDay
       * @summary get address coin balance history by day
       * @request GET:/addresses/{address_hash}/coin-balance-history-by-day
       */
      getAddressCoinBalanceHistoryByDay: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetAddressCoinBalanceHistoryByDayData, void>({
          path: `/addresses/${addressHash}/coin-balance-history-by-day`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressWithdrawals
       * @summary get address withdrawals
       * @request GET:/addresses/{address_hash}/withdrawals
       */
      getAddressWithdrawals: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetAddressWithdrawalsData, void>({
          path: `/addresses/${addressHash}/withdrawals`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressNft
       * @summary get list of NFT owned by address
       * @request GET:/addresses/{address_hash}/nft
       */
      getAddressNft: (
        addressHash: string,
        query?: {
          /** @example "ERC-721,ERC-404,ERC-1155" */
          type?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetAddressNftData, void>({
          path: `/addresses/${addressHash}/nft`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetAddressNftCollections
       * @summary get list of NFT owned by address, grouped by collection
       * @request GET:/addresses/{address_hash}/nft/collections
       */
      getAddressNftCollections: (
        addressHash: string,
        query?: {
          /** @example "ERC-721,ERC-404,ERC-1155" */
          type?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetAddressNftCollectionsData, void>({
          path: `/addresses/${addressHash}/nft/collections`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),
    };
    tokens = {
      /**
       * No description
       *
       * @name GetTokensList
       * @summary get tokens list
       * @request GET:/tokens
       */
      getTokensList: (
        query?: {
          /** @example "USDT" */
          q?: string;
          /** @example "ERC-20,ERC-721,ERC-1155" */
          type?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetTokensListData, void>({
          path: `/tokens`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetToken
       * @summary get token info
       * @request GET:/tokens/{address_hash}
       */
      getToken: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetTokenData, void>({
          path: `/tokens/${addressHash}`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetTokenTokenTransfers
       * @summary get token token transfers
       * @request GET:/tokens/{address_hash}/transfers
       */
      getTokenTokenTransfers: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetTokenTokenTransfersData, void>({
          path: `/tokens/${addressHash}/transfers`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetTokenHolders
       * @summary get token holders
       * @request GET:/tokens/{address_hash}/holders
       */
      getTokenHolders: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetTokenHoldersData, void>({
          path: `/tokens/${addressHash}/holders`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetTokenCounters
       * @summary get token holders
       * @request GET:/tokens/{address_hash}/counters
       */
      getTokenCounters: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetTokenCountersData, void>({
          path: `/tokens/${addressHash}/counters`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetNftInstances
       * @summary get NFT instances
       * @request GET:/tokens/{address_hash}/instances
       */
      getNftInstances: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetNftInstancesData, void>({
          path: `/tokens/${addressHash}/instances`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetNftInstance
       * @summary get NFT instance by id
       * @request GET:/tokens/{address_hash}/instances/{id}
       */
      getNftInstance: (addressHash: string, id: number, params: RequestParams = {}) =>
        this.request<GetNftInstanceData, void>({
          path: `/tokens/${addressHash}/instances/${id}`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetNftInstanceTransfers
       * @summary get transfers of NFT instance
       * @request GET:/tokens/{address_hash}/instances/{id}/transfers
       */
      getNftInstanceTransfers: (addressHash: string, id: number, params: RequestParams = {}) =>
        this.request<GetNftInstanceTransfersData, void>({
          path: `/tokens/${addressHash}/instances/${id}/transfers`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetTokenInstanceHolders
       * @summary get token instance holders
       * @request GET:/tokens/{address_hash}/instances/{id}/holders
       */
      getTokenInstanceHolders: (addressHash: string, id: number, params: RequestParams = {}) =>
        this.request<GetTokenInstanceHoldersData, void>({
          path: `/tokens/${addressHash}/instances/${id}/holders`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetNftInstanceTransfersCount
       * @summary get transfers count of NFT instance
       * @request GET:/tokens/{address_hash}/instances/{id}/transfers-count
       */
      getNftInstanceTransfersCount: (addressHash: string, id: number, params: RequestParams = {}) =>
        this.request<GetNftInstanceTransfersCountData, void>({
          path: `/tokens/${addressHash}/instances/${id}/transfers-count`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name RefetchTokenInstanceMetadata
       * @summary re-fetch token instance metadata
       * @request PATCH:/tokens/{address_hash}/instances/{id}/refetch-metadata
       */
      refetchTokenInstanceMetadata: (addressHash: string, id: number, data: RecaptchaBody, params: RequestParams = {}) =>
        this.request<
          RefetchTokenInstanceMetadataData,
          {
            /** @example "Invalid reCAPTCHA response" */
            message?: string;
          }
        >({
          path: `/tokens/${addressHash}/instances/${id}/refetch-metadata`,
          method: "PATCH",
          body: data,
          type: ContentType.Json,
          format: "json",
          ...params,
        }),
    };
    smartContracts = {
      /**
       * No description
       *
       * @name GetSmartContracts
       * @summary get verified smart contracts
       * @request GET:/smart-contracts
       */
      getSmartContracts: (
        query?: {
          /** @example "proxy" */
          q?: string;
          /** @example "vyper | solidity | yul" */
          filter?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetSmartContractsData, void>({
          path: `/smart-contracts`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetSmartContractsCounters
       * @summary get verified smart contracts counters
       * @request GET:/smart-contracts/counters
       */
      getSmartContractsCounters: (params: RequestParams = {}) =>
        this.request<GetSmartContractsCountersData, void>({
          path: `/smart-contracts/counters`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetSmartContract
       * @summary get smart contract
       * @request GET:/smart-contracts/{address_hash}
       */
      getSmartContract: (addressHash: string, params: RequestParams = {}) =>
        this.request<GetSmartContractData, void>({
          path: `/smart-contracts/${addressHash}`,
          method: "GET",
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetReadMethods
       * @summary get read methods
       * @request GET:/smart-contracts/{address_hash}/methods-read
       */
      getReadMethods: (
        addressHash: string,
        query?: {
          /** @example "true" */
          is_custom_abi?: string;
          /** @example "0xF61f5c4a3664501F499A9289AaEe76a709CE536e" */
          from?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetReadMethodsData, void>({
          path: `/smart-contracts/${addressHash}/methods-read`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetReadMethodsProxy
       * @summary get read methods proxy
       * @request GET:/smart-contracts/{address_hash}/methods-read-proxy
       */
      getReadMethodsProxy: (
        addressHash: string,
        query?: {
          /** @example "true" */
          is_custom_abi?: string;
          /** @example "0xF61f5c4a3664501F499A9289AaEe76a709CE536e" */
          from?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetReadMethodsProxyData, any>({
          path: `/smart-contracts/${addressHash}/methods-read-proxy`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetWriteMethods
       * @summary get write methods
       * @request GET:/smart-contracts/{address_hash}/methods-write
       */
      getWriteMethods: (
        addressHash: string,
        query?: {
          /** @example "true" */
          is_custom_abi?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetWriteMethodsData, void>({
          path: `/smart-contracts/${addressHash}/methods-write`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name GetWriteMethodsProxy
       * @summary get write methods proxy
       * @request GET:/smart-contracts/{address_hash}/methods-write-proxy
       */
      getWriteMethodsProxy: (
        addressHash: string,
        query?: {
          /** @example "true" */
          is_custom_abi?: string;
        },
        params: RequestParams = {},
      ) =>
        this.request<GetWriteMethodsProxyData, void>({
          path: `/smart-contracts/${addressHash}/methods-write-proxy`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

      /**
       * No description
       *
       * @name QueryReadMethod
       * @summary query read method
       * @request POST:/smart-contracts/{address_hash}/query-read-method
       */
      queryReadMethod: (addressHash: string, data: ReadMethodQueryBody, params: RequestParams = {}) =>
        this.request<QueryReadMethodData, void>({
          path: `/smart-contracts/${addressHash}/query-read-method`,
          method: "POST",
          body: data,
          type: ContentType.Json,
          format: "json",
          ...params,
        }),
    };
    config = {
      /**
       * No description
       *
       * @name GetJsonRpcUrl
       * @summary get json rpc url
       * @request GET:/config/json-rpc-url
       */
      getJsonRpcUrl: (params: RequestParams = {}) =>
        this.request<GetJsonRpcUrlData, any>({
          path: `/config/json-rpc-url`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
    withdrawals = {
      /**
       * No description
       *
       * @name GetWithdrawals
       * @summary get withdrawals
       * @request GET:/withdrawals
       */
      getWithdrawals: (params: RequestParams = {}) =>
        this.request<GetWithdrawalsData, any>({
          path: `/withdrawals`,
          method: "GET",
          format: "json",
          ...params,
        }),
    };
  }
