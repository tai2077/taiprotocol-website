// English translations for TAI Protocol Landing
export const en = {
    // Navigation
    nav: {
        home: 'HOME',
        protocol: 'PROTOCOL',
        terminal: 'TERMINAL',
        ecosystem: 'ECOSYSTEM',
        whitepaper: 'WHITEPAPER',
        docs: 'DOCS',
        launchApp: 'LAUNCH APP',
    },

    // Header
    header: {
        navigation: 'NAVIGATION',
        mainnetActive: 'MAINNET ACTIVE',
        mainnet: 'MAINNET',
    },

    // Hero Section
    hero: {
        protocolLive: 'PROTOCOL_LIVE',
        title: 'PROOF OF',
        titleGradient: 'MARKET',
        subtitle: "ONE MAN'S CODE",
        subtitleGradient: 'REVOLUTION.',
        description: "A radical defiance against centralized finance structures. We don't ask for permission. We build the alternative. TAI Protocol is the first handshake of a broken system.",
        ctaPrimary: 'JOIN THE REVOLUTION',
        ctaSecondary: 'EXPLORE TERMINAL',
        manifestoTitle: 'CODE IS LAW',
        antiGridTitle: 'DECENTRALIZATION MANIFESTO',
        manifestoItems: [
            '「CODE IS LAW」— Smart contracts are the only judge. No backdoors. No exceptions.',
            '「NO PERFORMANCE, NO LIQUIDITY」— Price target not met? Not a single token flows out. Iron law.',
            '「ON-CHAIN TRANSPARENCY」— All rules hardcoded. Verifiable by anyone. No black boxes.',
            '「PROOF OF MARKET」— Not time. Not VC votes. Real money price consensus.',
        ],
        stats: {
            nodesOnline: 'NODES ONLINE',
            blockHeight: 'BLOCK HEIGHT',
            uptime: 'UPTIME',
            unstoppable: 'UNSTOPPABLE',
        },
        scrollDown: 'SCROLL_DOWN',
    },

    // Comparison Section
    comparison: {
        statusLabel: 'STATUS: UNSTOPPABLE',
        title: 'TAI',
        titleAccent: 'vs',
        titleEnd: 'THE WORLD',
        vibeCheck: 'VIBE_CHECK',
        vibeTime: '0.00ms',
        radical: 'RADICAL',
        categories: {
            unlock: 'UNLOCK MECHANISM',
            rounds: 'UNLOCK ROUNDS',
            circuit: 'CIRCUIT BREAKER',
            constraint: 'TEAM CONSTRAINT',
            alignment: 'INTEREST ALIGNMENT',
        },
        traditional: {
            title: 'TRADITIONAL',
            unlock: 'Time passage',
            rounds: '1-4 times',
            circuit: 'None',
            constraint: 'Weak (just wait)',
            alignment: 'Low',
        },
        tai: {
            title: 'TAI PoM',
            unlock: 'Price target + 72h hold',
            rounds: '18 progressive rounds',
            circuit: 'Auto-reset on price drop',
            constraint: 'Strong (must drive real usage)',
            alignment: 'Maximum (shared destiny)',
        },
        stats: {
            totalSupply: 'Total Supply',
            unit: {
                tai: 'TAI',
                rounds: 'rounds',
                hours: 'hours',
                empty: '',
            },
            unlockRounds: 'Unlock Rounds',
            consensusPeriod: 'Consensus Period',
            finalTarget: 'Final Target',
        },
        footerBad: '92% of projects use this',
        footerGood: 'NO PERFORMANCE, NO LIQUIDITY',
        quote: '"Code is Safer Than Human Nature" — Liquidity without performance is false wealth.',
    },

    // Terminal Section
    terminal: {
        title: 'TAI',
        subtitle: 'PROTOCOL_V1.0',
        tvlLabel: 'TOTAL_VALUE_LOCKED',
        priceLabel: 'TAI_INDEX_PRICE',
        bashTitle: 'BASH ~- 80×24',
        authWallet: 'Authenticating wallet:',
        handshakeComplete: '[SUCCESS] Handshake complete.',
        commandPrefix: 'TAI_PROTOCOL@USER:~$',
        statusCommand: 'tai --status',
        vaultsActive: 'Vaults Active:',
        totalDebt: 'Total Debt:',
        stabilityFee: 'Global Stability Fee:',
        rootCompiling: '[0x1F] K_ROOT: COMPILING REVOLUTION...',
        rootDecrypting: '[0x1F] K_ROOT: DECRYPTING TAI_NODES...',
        voidBypassing: '[0x1F4] K_VOID: BYPASSING CENTRALIZED_GATEWAY...',
        enterCommand: 'ENTER_COMMAND_HERE...',
        help: 'HELP',
        execute: 'EXECUTE',
        ok: 'OK',
        done: 'DONE',
        pending: 'PENDING',

        // Stats
        currentRound: 'CURRENT_ROUND',
        fixedStakingYield: 'FIXED_STAKING_YIELD',
        total18Change: 'TOTAL_18_ROUNDS',

        // Monitor
        systemHealthMonitor: 'SYSTEM_HEALTH_MONITOR',
        liquidityDepth: 'LIQUIDITY_DEPTH',
        collateralRatio: 'COLLATERAL_RATIO',
        oracleAlert: 'INFO: Oracle connected to TON mainnet. Current Round: 0',

        // Terminal Window
        copyright: 'All rights reserved.',
        connectingLayer2: 'Establishing secure tunnel to Layer 2...',

        // Chain Data
        rawChainDataStream: 'RAW_CHAIN_DATA_STREAM',
        syncingBlock: 'SYNCING_BLOCK',
        headers: {
            timestamp: 'TIMESTAMP',
            method: 'METHOD',
            hash: 'HASH_ID',
            status: 'STATUS'
        },
        status: {
            confirmed: 'CONFIRMED',
            pending: 'MEMPOOL_WAIT',
            reverted: 'REVERTED',
            active: 'ACTIVE',
            healthy: '(HEALTHY)'
        },

        // Footer Stats
        taiPrice: 'TAI_PRICE:',
        genesis: '(GENESIS)',
        round1Target: 'ROUND_1_TARGET:',
        oracleStatus: 'ORACLE_STATUS:',
    },

    // Ecosystem Section
    ecosystem: {
        title: 'NEURAL WEB:',
        titleAccent: 'ECOSYSTEM MANIFEST',
        statusLabel: 'SYSTEM_STATUS: ACTIVE / NEURAL_DENSITY 84%',
        activeNode: 'ACTIVE_NODE',
        nodeTitle: 'NEURAL_DENSE_ARRAY',
        nodeDescription: 'Primary settlement layer integration for TAI Protocol. Providing high-throughput data sharding and neural routing capabilities for the ecosystem.',
        strength: 'STRENGTH',
        connections: 'CONNECTIONS',
        dataStream: 'DATA_STREAM_SEC_',
        categories: {
            ecosystem: 'ECOSYSTEM',
            staking: 'STAKING',
            governance: 'GOVERNANCE',
            docs: 'DOCS',
        },
        searchPlaceholder: 'LOCATE_NODE...',
        nodes: {
            tonBlockchain: {
                title: 'TON Blockchain',
                description: 'Layer-1 infrastructure for TAI protocol operations.',
            },
            taiPlatform: {
                title: 'TAI Platform',
                description: 'Telegram Mini App marketplace & Builder for ecosystem apps.',
            },
            stakingPool: {
                title: 'Staking Pool',
                description: 'Flexible staking with 6% per-round rewards.',
            },
            fixedStaking: {
                title: 'Fixed Staking',
                description: '200% total yield with phased unlock.',
            },
            vestingContract: {
                title: 'Vesting Contract',
                description: '18-round price milestone unlock system.',
            },
            simpleOracle: {
                title: 'Simple Oracle',
                description: 'Price feed for unlock conditions.',
            },
        },
        filters: {
            all: 'ALL NODES',
            infra: 'INFRASTRUCTURE',
            dapps: 'DAPPS',
            validators: 'VALIDATORS',
        },
        stats: {
            setLoad: 'SET_LOAD',
            blockHeight: 'BLOCK_HEIGHT',
            activeVectors: 'ACTIVE_VECTORS',
        },
        viewWhitepaper: 'VIEW WHITEPAPER',
        terms: 'TERMS OF SERVICE',
    },

    // FAQ Section
    faq: {
        title: 'FREQUENTLY_ASKED',
        titleAccent: 'QUERIES',
        items: [
            {
                question: 'What is Proof of Market (PoM)?',
                answer: 'Proof of Market is a revolutionary token standard created by TAI Protocol. Unlike traditional time-based vesting, tokens only unlock when market price reaches specific targets and maintains for 72 hours. No performance, no liquidity.',
            },
            {
                question: 'How does the 18-round unlock work?',
                answer: 'TAI uses 18 progressive unlock rounds from $0.00008 to $1.98 (24,750x growth). Each round releases 5 billion TAI when the price target is met and maintained for 72 hours. If price drops, the timer resets.',
            },
            {
                question: 'What is the $1.0 price threshold for team funds?',
                answer: 'TeamVault and FundPool can only withdraw when TAI price reaches $1.0 or above. This aligns team interests with holders - the team must drive real value to access their allocation.',
            },
            {
                question: 'How do staking rewards work?',
                answer: 'Two modes: Flexible Staking (6% per round, 100B limit/round) and Fixed Staking (200% total yield, 90B total limit, principal unlocks at Round 12, rewards at Round 18).',
            },
            {
                question: 'Is TAI audited and secure?',
                answer: 'Yes. All smart contracts are audited, immutable (non-upgradeable), and deployed on TON mainnet. Code is the only team - no backdoors, no exceptions.',
            },
        ],
        accessGranted: 'TERMINAL ACCESS GRANTED',
        stats: {
            tvl: 'TOTAL VALUE LOCKED',
            rebels: 'REBEL COUNT',
            online: '[ONLINE]',
        },
        chat: {
            welcome: 'WELCOME TO THE FRONT LINE. THE LIQUIDITY REVOLUTION IS NOT TELEVISED, IT IS CODE. WHAT DO YOU NEED TO KNOW, REBEL?',
            placeholder: 'ASK THE PROTOCOL... [TYPE COMMAND]',
            execute: 'EXECUTE',
            now: 'NOW',
            justNow: 'JUST NOW',
        },
        cta: {
            badge: 'ENCRYPTED CHANNEL',
            title: 'GET THE INTEL',
            subtitle: 'Join the encrypted frequency for protocol updates and drops. No spam. Only the signal.',
            connect: 'CONNECT',
        },
    },

    // Footer Section
    footer: {
        tagline: 'NO PERFORMANCE, NO LIQUIDITY.',
        description: 'TAI Protocol introduces Proof of Market (PoM) - where market price consensus is the only key to unlock tokens.',
        socialTitle: 'SOCIAL',
        resourcesTitle: 'RESOURCES',
        verifiedBy: 'VERIFIED_BY',
        systemStatus: 'ALL SYSTEMS OPERATIONAL',
        copyright: '© {year} TAI_PROTOCOL_MAINFRAME',
        links: {
            changelog: 'CHANGELOG',
            status: 'STATUS',
            privacy: 'PRIVACY',
            terms: 'TERMS',
        },
        social: {
            twitter: 'X (Twitter)',
            telegram: 'Telegram',
            medium: 'Medium',
            whitepaper: 'Whitepaper',
            brandKit: 'Brand Kit',
            bugBounty: 'Bug Bounty',
        },
        version: 'TERMINAL: v1.0.4',
    },

    // Whitepaper Page
    whitepaper: {
        title: 'TAI PROTOCOL WHITEPAPER',
        subtitle: 'Proof of Market (PoM) Standard',
        downloadPdf: 'DOWNLOAD PDF',
        tableOfContents: 'TABLE OF CONTENTS',
        sections: {
            abstract: 'Abstract',
            painPoints: 'Industry Pain Points',
            solution: 'Solution: Proof of Market',
            tokenomics: 'Tokenomics',
            staking: 'Staking Mechanism',
            ecosystem: 'Ecosystem',
            contracts: 'Smart Contracts',
            roadmap: 'Roadmap',
            founder: 'Founder',
            vision: 'Vision',
            addresses: 'Contract Addresses',
        },
    },

    // Unlock Rounds Data
    unlockRounds: {
        title: '18-ROUND UNLOCK SCHEDULE',
        round: 'Round',
        targetPrice: 'Target Price',
        phase: 'Phase',
        growth: 'Growth',
        status: 'Status',
        phases: {
            genesis: 'Genesis',
            growth: 'Growth',
            expansion: 'Expansion',
            maturity: 'Maturity',
        },
        statuses: {
            current: 'CURRENT',
            pending: 'PENDING',
            locked: 'LOCKED',
            unlocked: 'UNLOCKED',
        },
    },

    // Protocol Section
    protocol: {
        badge: 'REVOLUTIONARY TOKEN STANDARD',
        heroTitle: 'PROOF',
        heroTitleGradient: 'OF MARKET',
        heroSubtitle: 'Price is the only key to unlock. Not time, not VC votes, but price consensus formed by market participants voting with real money.',
        heroQuote: 'Code is safer than human nature',
        stats: {
            totalSupply: 'Total Supply',
            unlockRounds: 'Unlock Rounds',
            consensusPeriod: 'Consensus Period',
            totalGrowth: 'Total Growth',
        },
        mechanism: {
            title: 'PoM MECHANISM FLOW',
            step1Title: 'Price Target',
            step1Desc: 'Market price reaches current round target',
            step2Title: '72h Consensus',
            step2Desc: 'Price must stay above target',
            step3Title: 'Auto Unlock',
            step3Desc: 'Contract auto-distributes 5B TAI',
            circuitBreaker: 'Circuit Breaker',
            circuitBreakerDesc: 'Price drops below target, timer resets',
        },
        rounds: {
            title: '18-ROUND PRICE MILESTONES',
            subtitle: 'From $0.00008 to $1.98 — {growth}× growth',
            roundLabel: 'ROUND',
            multiplier: 'Multiplier',
            unlockAmount: 'Unlock Amount',
            consensus: 'Consensus',
            distribution: 'Distribution',
            community: 'Community',
            team: 'Team',
            fixedStaking: 'Fixed Staking',
            stakingRewards: 'Staking Rewards',
        },
        comparison: {
            title: 'TRADITIONAL vs TAI PoM',
            traditional: 'Traditional Time-Lock',
            unlockCondition: 'Unlock Condition',
            timePasses: 'Time passes',
            priceTarget: 'Price + 72h',
            circuitBreaker: 'Circuit Breaker',
            none: 'None',
            autoReset: 'Auto Reset',
            teamConstraint: 'Team Constraint',
            weak: 'Weak',
            strong: 'Strong',
            alignment: 'Alignment',
            low: 'Low',
            veryHigh: 'Very High',
            traditionalFooter: '92% projects use this model',
            taiFooter: 'No performance, no liquidity',
        },
        rules: {
            title: 'IRON RULES',
            codeIsLaw: 'Code is Law',
            codeIsLawDesc: 'Smart contract is the only judge, no backdoors, no exceptions',
            noPerformance: 'No Performance, No Liquidity',
            noPerformanceDesc: 'Price not met, not a single token flows out',
            onChain: 'On-chain Transparency',
            onChainDesc: 'All rules in contract, verifiable by anyone',
            marketProof: 'Market Proof',
            marketProofDesc: 'Real money price consensus, not VC votes',
        },
        cta: {
            whitepaper: 'Read Whitepaper',
            launchApp: 'Launch App',
        },
    },

    // Ecosystem Section Extended
    ecosystemPage: {
        title: 'TAI ECOSYSTEM',
        titleAccent: 'CONTRACT ARCHITECTURE',
        subtitle: '10 Smart Contracts · TON Mainnet · Fully Decentralized',
        contractDetails: 'CONTRACT DETAILS',
        address: 'Address',
        type: 'Type',
        connections: 'Connections',
        filters: {
            all: 'ALL',
            infra: 'INFRA',
            staking: 'STAKING',
            governance: 'GOVERNANCE',
            dapps: 'DAPPS',
        },
        staking: {
            title: 'STAKING MECHANISM',
            flexible: 'FLEXIBLE',
            fixed: 'FIXED',
            perRound: 'Per Round',
            totalYield: 'Total Yield',
            noLockup: 'No lock-up period',
            withdrawAnytime: 'Withdraw anytime',
            flexibleLimit: '100B TAI limit per round',
            principalUnlock: 'Principal unlocks at Round 12',
            rewardsUnlock: 'Rewards unlock at Round 18',
            fixedLimit: '90B TAI total limit',
        },
        governance: {
            title: 'GOVERNANCE',
            pomTitle: 'Proof of Market (PoM)',
            pomDesc: 'TAI Protocol governance is driven by market price consensus. Code is law, price is the only key.',
            withdrawThreshold: 'Team/Fund withdrawal threshold',
            consensusPeriod: 'Price consensus period',
            unlockRounds: 'Unlock rounds',
        },
        apps: {
            title: 'ECOSYSTEM APPS',
            falemeTitle: 'TAI Wealth Node',
            falemeDesc: 'Gamified crypto wealth management platform. Set goals, track progress, earn rewards.',
            tagWealth: 'Wealth',
            tagGamified: 'Gamified',
        },
        footer: {
            mainnet: 'TON MAINNET',
        },
    },

    // Common
    common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        confirm: 'Confirm',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        learnMore: 'Learn More',
        viewAll: 'View All',
        comingSoon: 'Coming Soon',
    },

    // Marquee
    marquee: {
        home: ['CODE IS LAW', 'CODE IS SAFER THAN HUMAN NATURE', 'PROOF OF MARKET', 'NO PERFORMANCE NO LIQUIDITY', 'PERMISSIONLESS', 'TRUSTLESS', 'DECENTRALIZED'],
        protocol: ['CODE IS LAW', 'PROOF OF MARKET', 'NO PERFORMANCE NO LIQUIDITY', 'DECENTRALIZED', 'TRUSTLESS', 'ON-CHAIN TRANSPARENCY'],
        bottom: ['CODE IS SAFER THAN HUMAN NATURE', 'PRICE IS THE ONLY KEY', 'DECENTRALIZATION MANIFESTO', 'JOIN THE REVOLUTION'],
    },
};

export type TranslationType = typeof en;
