// Chinese translations for TAI Protocol Landing
import { TranslationType } from './en';

export const zh: TranslationType = {
    // Navigation
    nav: {
        home: '首页',
        protocol: '协议',
        terminal: '终端',
        ecosystem: '生态',
        whitepaper: '白皮书',
        docs: '文档',
        launchApp: '启动应用',
    },

    // Header
    header: {
        navigation: '导航菜单',
        mainnetActive: '主网运行中',
        mainnet: '主网',
    },

    // Hero Section
    hero: {
        protocolLive: '协议已上线',
        title: '市场',
        titleGradient: '证明',
        subtitle: '一人代码',
        subtitleGradient: '革命。',
        description: '对中心化金融结构的激进反抗。我们不寻求许可，我们构建替代方案。TAI Protocol 是打破旧体系的第一次握手。',
        ctaPrimary: '加入革命',
        ctaSecondary: '探索终端',
        manifestoTitle: '代码即法律',
        antiGridTitle: '去中心化宣言',
        manifestoItems: [
            '「代码即法律」— 智能合约是唯一的裁判，没有后门，没有例外。',
            '「无业绩，无流动性」— 价格不达标，一枚代币都流不出。这是铁律。',
            '「链上透明」— 所有规则写在合约里，任何人可验证，没有暗箱操作。',
            '「市场证明」— 不是时间，不是 VC 投票，而是真金白银的价格共识。',
        ],
        stats: {
            nodesOnline: '节点在线',
            blockHeight: '区块高度',
            uptime: '运行时间',
            unstoppable: '势不可挡',
        },
        scrollDown: '向下滚动',
    },

    // Comparison Section
    comparison: {
        statusLabel: '状态：势不可挡',
        title: 'TAI',
        titleAccent: '对比',
        titleEnd: '世界',
        vibeCheck: '氛围检测',
        vibeTime: '0.00毫秒',
        radical: '激进派',
        categories: {
            unlock: '解锁机制',
            rounds: '解锁轮次',
            circuit: '熔断机制',
            constraint: '团队约束',
            alignment: '利益一致性',
        },
        traditional: {
            title: '传统模式',
            unlock: '时间流逝',
            rounds: '1-4次',
            circuit: '无',
            constraint: '弱（只需等待）',
            alignment: '低',
        },
        tai: {
            title: 'TAI PoM',
            unlock: '价格目标 + 72小时维持',
            rounds: '18轮渐进式',
            circuit: '价格跌破自动重置',
            constraint: '强（必须推动真实使用）',
            alignment: '极高（命运共同体）',
        },
        stats: {
            totalSupply: '总供应量',
            unit: {
                tai: 'TAI',
                rounds: '轮',
                hours: '小时',
                empty: '',
            },
            unlockRounds: '解锁轮次',
            consensusPeriod: '共识期',
            finalTarget: '最终价格',
        },
        footerBad: '92% 项目使用此模式',
        footerGood: '无业绩，无流动性',
        quote: '"代码比人性更安全" — 没有业绩的流动性是伪财富',
    },

    // Terminal Section
    terminal: {
        title: 'TAI',
        subtitle: '协议_V1.0',
        tvlLabel: '总锁仓价值',
        priceLabel: 'TAI_指数价格',
        bashTitle: '终端 ~- 80×24',
        authWallet: '正在认证钱包:',
        handshakeComplete: '[成功] 握手完成。',
        commandPrefix: 'TAI_PROTOCOL@用户:~$',
        statusCommand: 'tai --状态',
        vaultsActive: '活跃金库:',
        totalDebt: '总债务:',
        stabilityFee: '全局稳定费:',
        rootCompiling: '[0x1F] K_ROOT: 编译革命中...',
        rootDecrypting: '[0x1F] K_ROOT: 解密TAI节点中...',
        voidBypassing: '[0x1F4] K_VOID: 绕过中心化网关...',
        enterCommand: '在此输入命令...',
        help: '帮助',
        execute: '执行',
        ok: '确认',
        done: '完成',
        pending: '等待中',

        // Stats
        currentRound: '当前轮次',
        fixedStakingYield: '固定质押收益',
        total18Change: '18轮总收益',

        // Monitor
        systemHealthMonitor: '系统健康监控',
        liquidityDepth: '流动性深度',
        collateralRatio: '抵押率',
        oracleAlert: '提示: 预言机已连接到 TON 主网。当前轮次: 0',

        // Terminal Window
        copyright: '保留所有权利。',
        connectingLayer2: '正在建立到 Layer 2 的安全隧道...',

        // Chain Data
        rawChainDataStream: '原始链数据流',
        syncingBlock: '同步区块',
        headers: {
            timestamp: '时间戳',
            method: '方法',
            hash: '哈希',
            status: '状态'
        },
        status: {
            confirmed: '已确认',
            pending: '等待中',
            reverted: '已回滚',
            active: '活跃',
            healthy: '(健康)'
        },

        // Footer Stats
        taiPrice: 'TAI价格:',
        genesis: '(创世价格)',
        round1Target: '第1轮目标:',
        oracleStatus: '预言机状态:',
    },

    // Ecosystem Section
    ecosystem: {
        title: '神经网络:',
        titleAccent: '生态系统宣言',
        statusLabel: '系统状态: 活跃 / 神经密度 84%',
        activeNode: '活跃节点',
        nodeTitle: '神经密集阵列',
        nodeDescription: 'TAI Protocol 的主要结算层集成。为生态系统提供高吞吐量数据分片和神经路由功能。',
        strength: '强度',
        connections: '连接数',
        dataStream: '数据流_秒_',
        categories: {
            ecosystem: '生态系统',
            staking: '质押',
            governance: '治理',
            docs: '文档',
        },
        searchPlaceholder: '定位节点...',
        nodes: {
            tonBlockchain: {
                title: 'TON 区块链',
                description: 'TAI 协议运营的 Layer-1 基础设施。',
            },
            taiPlatform: {
                title: 'TAI 平台',
                description: 'Telegram Mini App 市场和生态应用构建器。',
            },
            stakingPool: {
                title: '质押池',
                description: '灵活质押，每轮 6% 收益。',
            },
            fixedStaking: {
                title: '固定质押',
                description: '分阶段解锁，总收益 200%。',
            },
            vestingContract: {
                title: '归属合约',
                description: '18轮价格里程碑解锁系统。',
            },
            simpleOracle: {
                title: '简单预言机',
                description: '解锁条件的价格数据源。',
            },
        },
        filters: {
            all: '所有节点',
            infra: '基础设施',
            dapps: '应用',
            validators: '验证者',
        },
        stats: {
            setLoad: '网络负载',
            blockHeight: '区块高度',
            activeVectors: '活跃向量',
        },
        viewWhitepaper: '查看白皮书',
        terms: '服务条款',
    },

    // FAQ Section
    faq: {
        title: '常见',
        titleAccent: '问题',
        items: [
            {
                question: '什么是市场证明（PoM）？',
                answer: '市场证明是 TAI Protocol 创建的革命性代币标准。与传统的时间解锁不同，代币只有在市场价格达到特定目标并维持72小时后才会解锁。没有业绩，就没有流动性。',
            },
            {
                question: '18轮解锁是如何运作的？',
                answer: 'TAI 使用18轮渐进式解锁，从 $0.00008 到 $1.98（24,750倍增长）。当价格目标达成并维持72小时，每轮释放50亿 TAI。如果价格下跌，计时器重置。',
            },
            {
                question: '团队资金的 $1.0 价格门槛是什么？',
                answer: 'TeamVault 和 FundPool 只有在 TAI 价格达到 $1.0 或以上时才能提取。这使团队利益与持有者一致——团队必须推动真实价值才能获取其分配。',
            },
            {
                question: '质押奖励如何运作？',
                answer: '两种模式：灵活质押（每轮6%，每轮上限100亿）和固定质押（总收益200%，总上限90亿，本金第12轮解锁，奖励第18轮解锁）。',
            },
            {
                question: 'TAI 经过审计且安全吗？',
                answer: '是的。所有智能合约都经过审计，不可升级，已部署在 TON 主网上。代码是唯一的团队——没有后门，没有例外。',
            },
        ],
        accessGranted: '终端访问已授权',
        stats: {
            tvl: '总锁仓价值',
            rebels: '反叛者计数',
            online: '[在线]',
        },
        chat: {
            welcome: '欢迎来到前线。流动性革命不会被电视转播，它是代码。反叛者，你需要知道什么？',
            placeholder: '询问协议... [输入命令]',
            execute: '执行',
            now: '现在',
            justNow: '刚刚',
        },
        cta: {
            badge: '加密频道',
            title: '获取情报',
            subtitle: '加入加密频道获取协议更新和空投。无垃圾信息，只有信号。',
            connect: '连接',
        },
    },

    // Footer Section
    footer: {
        tagline: '没有业绩，就没有流动性。',
        description: 'TAI Protocol 引入市场证明（PoM）——市场价格共识是代币解锁的唯一钥匙。',
        socialTitle: '社交媒体',
        resourcesTitle: '资源',
        verifiedBy: '审计方',
        systemStatus: '所有系统正常运行',
        copyright: '© {year} TAI_PROTOCOL_主框架',
        links: {
            changelog: '更新日志',
            status: '状态',
            privacy: '隐私政策',
            terms: '服务条款',
        },
        social: {
            twitter: 'X (推特)',
            telegram: 'Telegram',
            medium: 'Medium',
            whitepaper: '白皮书',
            brandKit: '品牌资源',
            bugBounty: '漏洞赏金',
        },
        version: '终端: v1.0.4',
    },

    // Whitepaper Page
    whitepaper: {
        title: 'TAI PROTOCOL 白皮书',
        subtitle: '市场证明（PoM）标准',
        downloadPdf: '下载 PDF',
        tableOfContents: '目录',
        sections: {
            abstract: '摘要',
            painPoints: '行业痛点',
            solution: '解决方案：市场证明',
            tokenomics: '代币经济学',
            staking: '质押机制',
            ecosystem: '生态系统',
            contracts: '智能合约',
            roadmap: '路线图',
            founder: '创始人',
            vision: '愿景',
            addresses: '合约地址',
        },
    },

    // Unlock Rounds Data
    unlockRounds: {
        title: '18轮解锁计划',
        round: '轮次',
        targetPrice: '目标价格',
        phase: '阶段',
        growth: '增长',
        status: '状态',
        phases: {
            genesis: '创世',
            growth: '增长期',
            expansion: '扩张期',
            maturity: '成熟期',
        },
        statuses: {
            current: '当前',
            pending: '等待中',
            locked: '已锁定',
            unlocked: '已解锁',
        },
    },

    // Common
    common: {
        loading: '加载中...',
        error: '错误',
        success: '成功',
        cancel: '取消',
        confirm: '确认',
        close: '关闭',
        back: '返回',
        next: '下一步',
        learnMore: '了解更多',
        viewAll: '查看全部',
        comingSoon: '即将推出',
    },

    // Marquee
    marquee: {
        home: ['代码即法律', '代码比人性更安全', '市场证明', '无业绩无流动性', '无需许可', '去信任', '去中心化'],
        protocol: ['代码即法律', '市场证明', '无业绩无流动性', '去中心化', '去信任', '链上透明'],
        bottom: ['代码比人性更安全', '价格是唯一的钥匙', '去中心化宣言', '加入革命'],
    },
};
