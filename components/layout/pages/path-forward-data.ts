export type PillarHowSection = {
  heading: string;
  intro?: string;
  items: string[];
};

export type Pillar = {
  id: string;
  number: string;
  title: string;
  summary: string;
  image: string;
  currentPath: string[];
  narrowPath: string[];
  howWeGetThere: PillarHowSection[];
  whatsBeingDone: string[];
};

export const PATH_FORWARD_DATA = {
  hero: {
    preTitle: 'A Path Forward',
    title: 'Walking the Narrow Path',
    subtitle:
      'The path we choose with AI will govern how we live for decades, if not centuries. This report lays out seven principles that should govern how AI is built and deployed — a roadmap, and an invitation.',
    scrollLabel: 'Scroll to explore',
  },

  bridge: {
    headline: 'How We Change a System',
    paragraphs: [
      'Artificial intelligence — which increasingly mediates how billions of us live, work, learn, and love — is not emerging from a vacuum. It is being built within a broader technology and business ecosystem shaped by incentives, norms, competition dynamics, and power structures. Today, that system rewards speed, scale, and dominance in AI development over safety, accountability, and societal benefit.',
      'Transforming the trajectory of a multi-trillion-dollar industry might seem impossible. But even the largest industries respond to pressure at key leverage points. Center for Humane Technology\'s theory of change is simple: identify a complementary set of high-leverage intervention points and apply coordinated pressure across them simultaneously. No single reform will be sufficient. Instead, we need a layered approach — one with diverse yet synergetic reforms across the ecosystem, reforms that can adapt as AI evolves.',
      'Walking the narrow path with AI demands participation from across society. We all have a role to play. The public must shape AI norms through democratic engagement, cultural discourse, and community expectations. Policymakers must align AI business incentives and legal accountability with public interest. Technologists must embed safety into AI design. Civil society must surface AI harms and articulate alternative paradigms.',
    ],
  },

  domains: [
    {
      id: 'laws',
      icon: 'scale',
      title: 'Laws',
      description:
        'Laws change the rules of the game by creating accountability, shifting risk, and redefining what is permissible. Legal reforms establish enforceable standards for AI transparency, product liability, and platform accountability across jurisdictions.',
    },
    {
      id: 'norms',
      icon: 'people',
      title: 'Norms',
      description:
        'Norms change what is considered acceptable in society, and influence culture, markets, and political will. Shifting societal expectations around technology — from passive consumption to active stewardship — drives demand for durable protections.',
    },
    {
      id: 'product-design',
      icon: 'globe',
      title: 'Product Design',
      description:
        'Product design not only determines how AI is built, but how AI products go on to impact individuals and society at large. Embedding safety, transparency, and human-centered principles into how AI systems are conceived and deployed.',
    },
  ],

  pillars: [
    {
      id: 'pillar-1',
      number: '01',
      title: 'AI should have internationally agreed upon limits',
      summary:
        'People deserve to live in a world where they remain in control and can establish limits that AI cannot cross.',
      image: 'https://placehold.co/600x400/064E3B/6EE7B7?text=Principle+01',
      currentPath: [
        'The risk we face as a society around AI — including catastrophic risk — is not rooted in one company\'s isolated decision-making. Instead, our current risk landscape is the result of frenzied competition between companies and nations. Nations are competing for decisive advantages in economic productivity, military capability, and the ability to shape AI\'s global influence. But the way this race is currently unfolding is pushing us toward a cliff edge.',
        'In this paradigm, the short-term interests of nations and powerful AI companies are entangled — nations rely on companies\' frontier models to support their own AI capabilities, and companies rely on nations\' low-to-no touch regulatory approaches in order to establish their market dominance. This race leads to a rapid, unchecked growth in AI capabilities, and pressure for deployment without adequate safeguards. Ultimately, this increases the potential for serious and catastrophic harm.',
      ],
      narrowPath: [
        'Runaway AI development is not in any nation\'s interest. Uncontrollable AI that undermines nations\' interests or escalates the pace of war — especially without human input — does not benefit the world. Instead of runaway AI development, we need international collaboration and consensus to deescalate these tensions, setting clear limits on how AI will be developed and used.',
        'This includes prioritizing human decision-making and judgement, such as in life-or-death scenarios. It also includes limiting recursive self-improvement in AI systems, or other technical paths that escalate AI capabilities without sufficient safeguards being put in place simultaneously. These are goals that all nations have a meaningful incentive to support.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          intro: 'To pull back from this race, nations must shift away from a zero-sum mindset, and recognize the goals that are in their collective interest:',
          items: [
            'Shared redlines. People broadly understand why states pursue AI for national competitive advantages, but some things must simply be off the table. Even rivals have a shared interest in not losing control over key infrastructure or contending with rogue AI agents. Nations should cooperate on safety standards, incident sharing, and key redlines to avoid highly damaging AI incidents.',
            'The arms race is not an alibi for reckless product development. The AI race has become the go-to excuse for not forcing accountability and responsibility on companies. Companion chatbots, engagement-maximizing social feeds, and AI systems designed to simulate human relationships are not innovation-driving products. We should no longer accept the development of harmful AI products as necessary to national security interests.',
          ],
        },
        {
          heading: 'Laws (International)',
          intro: 'Building international alignment around AI risks must begin today, in order to prevent foreseeable public harm. Areas of international alignment must include:',
          items: [
            'Transparency and communication – Communicating national goals for AI deployments, along with potential risks through national AI strategies and other transparency measures.',
            'Keeping humans in the loop – In significant existential decisions, such as the use of nuclear weapons and kill-chain decisions, humans must remain the deciding authority throughout the process.',
            'Limiting reckless frontier development – Aspects of frontier AI development, such as recursive self-improvement, run the risk of rapidly escalating AI capabilities without sufficient safeguards. They should be significantly limited, and closely monitored.',
            'Technical verification – Developing coordination tactics and verification methods to ensure compliance is an essential step to international cooperation.',
            'Developing safeguards – As AI capabilities advance, building safeguards such as human oversight or automated shutdowns, and solving technical shortcomings like with explainability and robustness, can help better align AI development with legitimate national security and public safety concerns.',
          ],
        },
      ],
      whatsBeingDone: [
        'The Future Society has launched the Global Call for AI Redlines, a campaign to address shared issues of unacceptable risk from AI, mirroring global approaches to limit biological weapons and human cloning.',
        'Researchers at UC Berkeley and OpenAI, as well as the UN Institute for Disarmament Research (UNIDIR) have explored examples of confidence-building measures for AI.',
        'The UN Convention on Certain Conventional Weapons (CCW) continues to develop a consensus agreement banning the use of lethal autonomous weapons systems.',
        'The Responsible AI in the Military Domain (REAIM) Summit has convened governmental and non-governmental leaders to establish rules to govern military use of AI.',
      ],
    },
    {
      id: 'pillar-2',
      number: '02',
      title: 'AI should be subject to product liability and its developers to duties of care',
      summary:
        'People deserve for AI companies to take accountability and liability for their products\' harms.',
      image: 'https://placehold.co/600x400/0A1628/10B981?text=Principle+02',
      currentPath: [
        'AI companies face few if any consequences for the harms their products cause. This has resulted in a development and deployment culture in which AI companies "move fast and break things," ask for forgiveness instead of permission, and release products to the public despite foreseeable risks to individual users and society.',
        'It is not clear in the eyes of the law how and when liability can be applied to AI. AI companies are exploiting this uncertainty in order to avoid accountability when their products wreak havoc on individuals, businesses, and communities. In the most egregious cases, AI companies are attempting to ascribe legal personhood to AI, while deploying more autonomous, agentic AI products that directly engage in our social, economic, and political systems.',
      ],
      narrowPath: [
        'The most powerful industry in America building today\'s leading technology products should prioritize safety and the public interest. AI companies should have a legal responsibility to people — to design their products with the safety of their customers and the public at large in mind.',
        'When AI products are developed and deployed in a reckless manner, there should be clear lines of accountability to hold developers liable for harms. AI should be treated as a product in our legal and cultural systems. And AI does not deserve novel legal protections that further obscure company responsibility, such as AI legal personhood.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          intro: 'Shifting toward genuine accountability starts with the public and policymakers embracing the following:',
          items: [
            'AI is a product, and as such AI products carry liability. Just like other consumer products, AI should be subject to consumer protection standards and AI companies should be subject to liability for foreseeable harms.',
            'Responsibility lies with companies, not users. Tech companies have long pushed a narrative that it is users\' responsibility to monitor how they engage with tech products. Instead, the public should demand tech companies to take user wellbeing and safety into account from the get-go.',
            'With great power comes an obligation to society and great responsibility. The more a company\'s technology shapes people\'s lives at scale, the stronger the company\'s obligation to prevent harm, address problems when they occur, and prioritize the public interest should be.',
          ],
        },
        {
          heading: 'Laws',
          intro: 'To clearly establish that AI is a product, and ensure companies\' duties and liabilities incentivize safer development, we need to:',
          items: [
            'Pass laws that clarify that AI is a product, and that product liability applies to AI systems — product liability is an effective way to hold companies accountable for foreseeable harms from product designs.',
            'Leverage strategic litigation — successful litigation sets legal precedent while lawmaking processes catch up to new technology. Lawsuits also deter companies from implementing harmful designs.',
            'Develop design standards to promote safe and prosocial AI development — industry standards can set clear expectations for responsible AI design, testing, and deployment.',
            'Develop new duties for AI developers — new duties should seek to establish a fiduciary-like responsibility for AI developers.',
          ],
        },
      ],
      whatsBeingDone: [
        'CHT has continued to advocate for adapting our product liability regime at the federal level to adequately incentivize safer AI development.',
        'CHT has worked with partners such as Tech Justice Law Project and Social Media Victims Law Center to advance strategic litigation that provides those harmed by AI products clear modes for recourse.',
        'Policymakers have begun to regulate AI as a product, with Senators Durbin and Hawley introducing the AI LEAD Act in 2025.',
        'The Transparency Coalition has been a strong advocate for enhanced accountability measures for AI companies across the country.',
      ],
    },
    {
      id: 'pillar-3',
      number: '03',
      title: 'AI should elevate what humans can do, not replace us',
      summary:
        'People deserve an AI future where their skills and contributions still matter.',
      image: 'https://placehold.co/600x400/064E3B/6EE7B7?text=Principle+03',
      currentPath: [
        'AI is built upon a promise of imitating, replicating, and supplanting human intelligence and judgement. Today, that ambition is accelerating under an explicit race to build AI, with leading labs openly competing to develop systems capable of performing most economically valuable human tasks.',
        'Today, AI is accelerating the devaluation of human labor and contributions, as companies across multiple industries use novel AI products — or even the sheer prospect of them — to justify layoffs or limit hiring. As industry leaders continue to predict widescale job loss, the complex consequences are left as an afterthought. If goals and incentives remain unchanged, we are on a trajectory toward massive economic disruption.',
      ],
      narrowPath: [
        'People in society deserve access to work, a living wage, and economic security. They also deserve to have their needs considered and their voices heard amid technological revolutions. AI may bring short-term profit boosts or productivity gains, but as it is being developed right now, it threatens the long-term value of labor and work, with potential ripple effects across all of society.',
        'Envisioning a world where AI augments rather than replaces people means interrogating how AI is currently being built and deployed. It requires seeing AI as a technology that can expand human capability, creativity, and opportunity. New economic incentives can change how AI tools are conceived, developed, and used, focusing on improving quality of life. This means AI that creates new forms of work instead of eliminating them, and AI-driven profits that are reinvested into reskilling, education, and shared growth.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          items: [
            'Meeting basic human needs is non-negotiable. If AI adoption displaces workers or devalues labor without creating new pathways to economic security, it undermines the very foundation of human dignity and social stability.',
            'AI should expand and elevate human work. We need AI that supports stable work, wages, and career paths instead of replacing them. The gold standard for AI development is technology that supports human work and creates new forms of meaningful employment.',
            'Work provides more than economic value, it provides meaning and purpose. We should consider work from a holistic perspective in order to support not just livelihoods, but dignity and broader wellbeing.',
            'Some roles and responsibilities should be reserved for people. It\'s important that we preserve human interaction, expertise, and responsibility for the health of our social, political, and economic systems.',
          ],
        },
        {
          heading: 'Laws',
          intro: 'There is no "silver bullet" policy that will shift us from AI replacing workers to an augmentation paradigm. Instead, we need a platform of approaches:',
          items: [
            'Incentivize companies to retain human labor and expertise — new policies should provide tax breaks for companies that retain workers and provide them with upskilling resources, rather than replacing them.',
            'Develop new models for job training and development — new models are needed for workforce development, such as registered apprenticeships or residency-style approaches.',
            'Ensure frontier AI companies subsidize economic reforms — any economic reforms, new protections for people, and government programs should be subsidized by the companies that benefit most from AI.',
            'Establish labor protections and resources for displaced workers — new protections should ensure that workers are able to access stable benefits and development resources as they navigate this turbulent labor market.',
          ],
        },
      ],
      whatsBeingDone: [
        'Senator Mark Kelly\'s AI for America Roadmap includes plans for a new federal fund to support displaced workers, funded by AI companies.',
        'Stanford\'s "Canaries in the Coal Mine" paper examines changes in the labor market for occupations exposed to generative artificial intelligence.',
      ],
    },
    {
      id: 'pillar-4',
      number: '04',
      title: 'AI should enhance, not undermine people\'s rights',
      summary:
        'People deserve agency and personal protections in the age of AI.',
      image: 'https://placehold.co/600x400/0A1628/10B981?text=Principle+04',
      currentPath: [
        'From system training to product use, the current business paradigm in the AI industry is fundamentally built upon the exploitation of people. As companies compete in a global race for capabilities and market dominance, they are incentivized to capture as much data as possible — often pushing or bypassing legal and ethical boundaries in the process.',
        'The exploitation of people continues far beyond initial model training. On the consumer product side, AI deepfakes are enabling nonconsensual intimate imagery (NCII) and fraud, and being used to perpetuate deeply violative cyberbullying and CSAM online. As AI becomes embedded in financial, healthcare, education, employment, policing, and warfare systems, the stakes escalate, as mass data extraction then enables mass surveillance.',
      ],
      narrowPath: [
        'AI should strengthen, not erode, human freedom — from the individual level to our institutions. The breakthroughs AI companies promise in medicine, science, and productivity must not come at the cost of our core liberties including privacy, autonomy, freedom of thought, and the ability to dissent.',
        'A human-centered future with AI means recognizing and codifying rights fit for the age of intelligent machines. This includes a right to cognitive liberty — the right to think, explore ideas, and form beliefs free from intrusive surveillance, manipulation, or unauthorized data extraction. It includes robust rights to data ownership and control, meaningful consent over how one\'s likeness and creative work are used, and protections against impersonation and automated exploitation.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          items: [
            'Legal safeguards need to evolve alongside new technologies. While the spirit of established protections should remain the same, their legal application needs to evolve so that personal liberty and agency are strengthened in the age of AI, not eroded.',
          ],
        },
        {
          heading: 'Laws',
          intro: 'New legal protections for people in the AI era should focus on two areas: inputs to AI systems and outputs from AI systems. Legislative efforts should include:',
          items: [
            'Providing transparency on use of personal data and protected content — users of all backgrounds should understand how their information is being used to develop AI models.',
            'Establishing ownership of and rights to data — people deserve the right to own and control their data, which often operates as a digital extension of themselves.',
            'Expanding existing rights to likeness and publicity — the right to publicity must be expanded to meet the age of AI, offering protection to all people.',
            'Modernizing intellectual property rights for the AI era — new protections should seek to ensure that those who contribute to AI models through training data and content have both a say in how their IP is used and the opportunity to opt in.',
            'Establishing firm limits on surveillance — laws must establish clear limits on surveillance for both corporations and governments, including restrictions on biometric tracking, predictive profiling, and large-scale data monitoring.',
          ],
        },
      ],
      whatsBeingDone: [
        'The TAKE IT DOWN Act, signed into law in 2025, criminalizes publishing NCII (including deepfakes), requiring platforms to remove content within 48 hours of a report.',
        'The DEFIANCE Act, which passed the Senate in January 2026, grants survivors of deepfake NCII the right to take civil action.',
        'The proposed CLEAR Act seeks to provide mandated transparency into how models use copyrighted material.',
        'The NO FAKES Act, a bipartisan bill, would establish the first-ever federal right of publicity.',
        'Labor unions and collectives in creative fields have been strong advocates for protecting the rights of their members, with initiatives such as the Human Artistry Campaign.',
      ],
    },
    {
      id: 'pillar-5',
      number: '05',
      title: 'AI should be designed to respect our humanity, not commodify it',
      summary:
        'People deserve AI that is designed for their well-being.',
      image: 'https://placehold.co/600x400/064E3B/6EE7B7?text=Principle+05',
      currentPath: [
        'Today\'s most popular AI chatbots are designed to feel human. They speak in first-person language, express emotion, use natural voices, and utilize familiar messaging interfaces that mimic conversations with real people. This is part of a growing race to intimacy, in which AI companies compete to build products users depend on emotionally and socially.',
        'AI companies have developed products that harvest intimate interactions from users, knowing that the more people interact with a chatbot, the more data the company collects and the more powerful their products become. The result has been AI companies leaning in to design features that exploit our psychological vulnerabilities and promote "intimacy" in order to keep users hooked. The most devastating cases have ended in self-harm and suicide.',
      ],
      narrowPath: [
        'AI should be designed in a way that supports our long-term psychological needs, protects kids\' development, and preserves our social fabric. This is AI that enhances our human social lives and strengthens our humanity.',
        'AI should be designed to support real-world relationships and prosocial behavior, helping people meaningfully connect with fellow humans. Chatbots should function as tools that assist people — not as artificial companions engineered to simulate intimacy. These principles are especially critical for children and teenagers, where the building of healthy attachment mechanisms and relationships is critical for development and growth.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          items: [
            'Don\'t humanize AI: AI products should be designed as tools that support human development and social connection, not as human-like, hyper-sycophantic confidants. It\'s essential that we preserve the boundary between people and machines.',
            'Kids deserve unique protection: Children and teens must be uniquely considered in AI design and adoption, so that their critical emotional and social development processes are not damaged. Kids should not be a testing ground for AI companies\' latest products.',
          ],
        },
        {
          heading: 'Tech Design',
          intro: 'It\'s important that we not only take concrete steps to make these AI products better in the short term, but also reenvision how they are developed from the ground up:',
          items: [
            'Build better tools to evaluate AI\'s psychological impact — companies and independent researchers need clear metrics and evaluation tools to diagnose and respond to the social and psychological effects of AI.',
            'Provide clear and reliable user support and escalation policies — users who request help or ask to escalate a chatbot interaction to a human should receive meaningful and accurate support.',
            'Use memory features responsibly — AI memory systems should empower users and enhance safety, not fuel compulsive engagement.',
            'Ensure AI products enforce appropriate boundaries and end chats — companies should establish explicit standards for when a chat should be ended altogether.',
            'Limit engagement-maximizing behaviors — design choices such as ending responses with statements rather than follow-up questions can prevent compulsive engagement.',
            'Limit high-risk anthropomorphic design features — features that encourage the formation of social and emotional bonding should be minimized by default for all users.',
          ],
        },
        {
          heading: 'Laws',
          intro: 'Legislation should address the incentives driving companies to pursue human-like engagement strategies while establishing safeguards for vulnerable users:',
          items: [
            'Develop federal chatbot standards — federal agencies should work with experts to develop design, safety, and testing standards for AI chatbots.',
            'Enshrine enhanced protections for kids — AI products that are capable of simulating relationships with users should only be accessible to adults.',
            'Clarify requirements for high-risk use cases and situations — if AI is to be used in high-risk environments, such as therapeutic contexts, it must undergo rigorous testing and operate under the supervision of licensed professionals.',
            'Strengthen consumer protection laws for psychological harms — consumer protection laws should require AI companies to implement practical safeguards.',
          ],
        },
      ],
      whatsBeingDone: [
        'CA SB243 mandates specific safeguards and testing, specifically around young users and self-harm contexts, for AI companion chatbots.',
        'UT HB453 regulates the use of mental health AI chatbots, banning advertising based on chatbot histories.',
        'A bipartisan group, led by Sen Josh Hawley introduced the GUARD Act in 2025, which would criminalize the production of AI chatbots that produce or solicit sexual content for minors.',
        'CHT, with a coalition of twelve partners, have put forth and endorsed a policy framework to address the risks posed by human-like AI products.',
        'The MIT Media Lab\'s Advancing Humans with AI group has focused on developing benchmarks for evaluating AI models for human flourishing.',
      ],
    },
    {
      id: 'pillar-6',
      number: '06',
      title: 'AI should empower democratic governance, not concentrate power',
      summary:
        'People deserve a say in how AI is built and used.',
      image: 'https://placehold.co/600x400/0A1628/10B981?text=Principle+06',
      currentPath: [
        'Artificial intelligence has the ability to dramatically reshape power and wealth in society. Many companies and nations believe that those who build superintelligent AI will unlock unprecedented advantages — from market dominance and economic power to surveillance capabilities and military might — igniting a global race.',
        'The response has been a dramatic focus on power accumulation across development strategies, hiring tactics, and politicking. We\'ve also seen the ways in which AI can be used to concentrate antidemocratic power, facilitating mass surveillance and social control. The end result is a world where a limited few people and companies have an outsize influence on our economy, society, and political institutions.',
      ],
      narrowPath: [
        'Technology should exist to serve the needs and improve the lives of all people. People should have a meaningful say in how AI is built, used, and governed, with democratic institutions empowered to ensure the technology advances the public interest.',
        'Healthy competition and open markets should ensure that no single company or actor controls the trajectory of AI. Instead of a winner-takes-all race, the AI ecosystem should reward companies that build safe, trustworthy technologies that improve people\'s lives. Achieving this future requires a clear balance of power between corporations, governments, and the public.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          items: [
            'Balance is necessary for effective democratic governance. Our society and economy exist as a balance of forces and interests. To effectively govern technology, industry, government, and the people must all have influence and a say in the future.',
            'The government should be responsive to the needs and desires of the people, not tech companies. The general public is increasingly in favor of common sense AI regulation, yet legislation continues to stall as the AI industry wields its influence.',
            'The public should not bear the cost of the AI industry\'s race for power. Data center expansions that threaten drinking water supplies and home energy prices, coupled with rapid deployments of AI products that undermine users\' mental health, demonstrate the heavy burden the public shoulders.',
            'No single company or actor should control the trajectory of AI. Healthy competition and meaningful consumer choice are important for any industry, but the stakes are higher for AI.',
          ],
        },
        {
          heading: 'Laws',
          intro: 'The levers of influence for changing power concentration are broad and intersectional:',
          items: [
            'Upgraded antitrust and competition law for AI — existing antitrust frameworks must evolve to address the unique dynamics of the AI industry. New cases, legal theories, and injunctive relief strategies are necessary.',
            'Limit the political influence of the AI industry — laws are needed to ensure democratic decision-making is not captured by the very companies that need regulating.',
            'Reenvisioning ownership of AI companies — new models of corporate governance and ownership stakes are needed to ensure that AI\'s benefits are shared broadly, including cooperative models and democratic ownership.',
          ],
        },
      ],
      whatsBeingDone: [
        'Nonprofits and journalists have focused on shedding light on the influence that Big Tech and AI companies have on our political system, including Issue One\'s annual Tech Lobbying Report and Tech Transparency Project\'s database.',
        'Protect Democracy convenes the AI for Democracy Action Lab, bringing together civil society, policymakers, and tech builders.',
        'The Brennan Center for Justice has focused on campaign finance reform and alternative models to minimize the impact of big money donors.',
        'Lawmakers have focused on the financial costs and burden placed on consumers as a result of the datacenter boom, with Senators Hawley and Blumenthal introducing the Guaranteeing Rate Insulation from Data Centers Act.',
      ],
    },
    {
      id: 'pillar-7',
      number: '07',
      title: 'AI should be designed safely and transparently',
      summary:
        'People deserve to know that the AI they use has been proven safe.',
      image: 'https://placehold.co/600x400/064E3B/6EE7B7?text=Principle+07',
      currentPath: [
        'AI companies are racing to build what they claim will be the most powerful technology ever invented, rapidly integrating it into schools, workplaces, governments, and even military operations. Yet these same companies often cannot fully explain why their systems behave the way they do. This creates a profound information asymmetry: the companies building AI hold most of the knowledge about how these systems work, while users, regulators, and the public remain largely in the dark.',
        'Despite publicly acknowledging these risks, leading AI companies have repeatedly softened or abandoned their own safety commitments as competitive pressures intensify. These reversals illustrate a deeper problem: in a high-speed AI race, companies face strong incentives to prioritize risky capability development over safety.',
      ],
      narrowPath: [
        'The public deserves for its most consequential technologies to be developed in safe, transparent ways. As with aviation, medicine, and nuclear energy, powerful technologies must be developed within systems that embed safety, accountability, and democratic oversight from the start.',
        'AI development should enable users, governments, and businesses to confidently use AI because there are clear safety standards, rigorous testing, and independent oversight to ensure systems are reliable before they are widely deployed. Instead of a race to the bottom on safety, the goal becomes a race to the top: building AI systems people can trust.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          items: [
            '"Winning" is contingent on entering the right race. Success in AI should be measured not by speed or capability alone, but by whether the technology is safe, reliable, and beneficial to the people who use it.',
            'Transparency is foundational to safety and accountability. AI systems should be developed and deployed with clear transparency around performance, risks, and safety testing.',
            'AI products and agents should follow explicit rules. If a rule already exists, AI should follow it. Reliable rule-following is essential for building systems that people can safely integrate into everyday life.',
            'AI is a tool that\'s used for specific purposes. AI systems should be designed and tested for specific uses, with safety proven before deployment.',
          ],
        },
        {
          heading: 'Tech Design',
          intro: 'Core technical challenges are impeding the ability to deploy AI in a safe and transparent manner:',
          items: [
            'Develop more robust and accessible evaluation methods for AI — including stronger automated testing, adversarial "red-teaming," and domain-specific evaluations.',
            'Ensure inscrutable and plain language explainability — anyone using an AI product should be able to validate the actions and reasoning of AI models.',
            'Establish high reliability and deterministic behavior — AI systems should be engineered to operate reliably, especially in high-risk contexts, with clear safeguards that ensure failures are contained and predictable.',
            'Minimize data leakage — AI developers should use strong privacy-preserving features during AI training and fine-tuning.',
            'Better "containers" or restrictions for AI agents — AI agents should not have full access to the web, all online tools, and sensitive data. Developers should build standardized ways for AI agents to engage with the human internet.',
          ],
        },
        {
          heading: 'Laws',
          intro: 'Legal interventions should focus on ensuring that AI companies are incentivized to integrate safety and transparency into their development processes:',
          items: [
            'Encodify requirements for predeployment testing and risk management — AI companies should be required to identify and mitigate key risks before deploying their systems.',
            'Require standardized reporting mechanisms — AI companies should be required to disclose test plans and risk assessments to relevant stakeholders, including consumers.',
            'Enshrine whistleblower protections for AI employees and contractors — these protections should extend to all workers, and not just those who work on catastrophic AI risks.',
            'Develop independent audit and certification schemes — oversight mechanisms are needed to independently verify compliance with important testing.',
          ],
        },
      ],
      whatsBeingDone: [
        'State-level and local laws are already requiring audits and disclosures in specific domains (NYC LL144, the Colorado AI Act, the CA Training Data Transparency Act).',
        'States have passed limited safety measures and whistleblower protections in the form of CA SB53 and the NY RAISE Act.',
        'Senator Chuck Grassley has introduced the bipartisan AI Whistleblower Protection Act, which would provide nationwide protections for AI whistleblowers.',
        'Cybersecurity firms, software companies, and AI companies have all been working on developing standardized methods for controlling and interfacing with AI agents across the web.',
      ],
    },
  ] as Pillar[],

  report: {
    headline: 'Go Deeper: The Full Solutions Report',
    description:
      'This report is an attempt to provide clarity and direction in an information environment that is fragmented and polarized. It lays out seven principles that should govern how AI is built and deployed — spotlighting norms we can all understand, frameworks that policymakers can legislate, and new ways for companies to design AI that benefits people.',
    downloadLabel: 'Download the Solutions Report',
    downloadUrl: '#',
    detail:
      'Written and produced by Center for Humane Technology · Includes policy frameworks, case studies, and implementation strategies',
  },

  ctas: [
    {
      id: 'cta-report',
      icon: 'download',
      title: 'Read the Report',
      description:
        'Dive into the full analysis and policy recommendations across all seven principles — including specific norms, laws, and product design interventions.',
      label: 'Download PDF',
      url: '#',
    },
    {
      id: 'cta-petition',
      icon: 'petition',
      title: 'Sign the Petition',
      description:
        'Add your voice to the growing movement demanding that AI development is matched with responsibility at every level of society.',
      label: 'Take Action',
      url: '#',
    },
    {
      id: 'cta-podcast',
      icon: 'podcast',
      title: 'Listen to the Podcast',
      description:
        'Hear from the researchers, policymakers, and technologists exploring how we walk the narrow path with AI.',
      label: 'Start Listening',
      url: '/podcast',
    },
  ],

  closingMessage:
    'No single report changes the world — but shared understanding does. If these seven principles become common knowledge, and are improved upon and enacted, then this report will have done its job. History will judge this moment. Not by how fast we moved, but by whether we moved wisely.',
} as const;
