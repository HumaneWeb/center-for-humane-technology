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
    preTitle: '',
    title: 'Path Forward',
    subtitle: '',
    scrollLabel: '',
  },
  introduction: [
    'Two prevailing narratives have shadowed every major technological leap. One narrative casts a new technology as the solution to humanity\u2019s greatest problems. The other casts it as a destabilizing force and the catalyst for societal collapse. From the printing press, to the Industrial Revolution, to the internet, this dichotomy around new technology has endured for centuries. With artificial intelligence, these dueling narratives have emerged once again. While the narratives themselves are not new, what is new is the technology\u2019s velocity, its scale, and how all-encompassing it has become in so little time.',
    'The path we are currently on with AI is a race between powerful companies and nations. It is a race run on the fuel of inevitability: \u201cif I don\u2019t build it, someone else will.\u201d Three years after OpenAI launched ChatGPT, driving other AI companies to accelerate their own development, we see the consequences of this race: rapid deployment of poorly designed AI, growing social and economic effects, and safety treated as an afterthought to competition and market dominance. Researchers, academics, advocates, and even those building the technology have been sounding the alarm. And yet the race continues, because the incentives driving it make acceleration look like the \u201conly\u201d rational choice \u2014 even for those who know better.',
    'The question was never whether AI would reshape society. It will. The real question is how \u2014 and who shapes the terms. Center for Humane Technology\u2019s (CHT) role is bringing clarity to complex problems, surfacing the incentive structures driving harmful outcomes, and showing an alternative path is possible. We call this the \u201cnarrow path\u201d: where AI development continues, but the technology\u2019s scale and power are matched with responsibility at every level of society.',
    'This report is an attempt to provide clarity and direction in an information environment that is fragmented, polarized, and where it is difficult to see the full picture. It lays out seven principles that should govern how AI is built and deployed. It is intended to be a roadmap, but also an invitation \u2014 each section spotlights norms we can all understand, frameworks that policymakers can legislate, and new ways for companies to design AI in a way that benefits people.',
    'Writing this report has been both an exciting and challenging process. Exciting to put pen to paper and synthesize research with a focus toward action. Challenging because the ground is moving quickly with AI. But even as AI rapidly evolves, the fundamentals of our situation remain the same \u2014 people deserve technology that genuinely improves their lives, and that brings forth a more humane future. The path we choose with AI will govern how we live for decades, if not centuries. AI is already being woven into everyday life and critical infrastructure at a pace that is revealing just how unprepared our institutions are for change. And these are the same institutions we need to call upon to regulate AI. The complexity of this problem can make it hard to put confidence in any one set of solutions. But inaction is also a choice, and it is the wrong one.',
    'No single report changes the world \u2014 but shared understanding does. If these seven principles become common knowledge, and are improved upon and enacted, then this report will have done its job. We are not starting from scratch. Researchers, civil society organizations, policymakers, and technologists around the world are already working on many of the challenges outlined here. CHT is proud to be in the trenches alongside them.',
    'History will judge this moment. Not by how fast we moved, but by whether we moved wisely. The narrow path doesn\u2019t require all of society to agree on everything. It simply requires enough of us to agree that the current path with AI is unacceptable, and that people deserve a better reality with this technology.',
    'And it asks us to then do something about it \u2014 together.',
  ],
  introSignatures: [
    { name: 'Julie Guirado', role: 'Executive Director' },
    { name: 'Camille Carlton', role: 'Policy Director' },
    { name: 'Pete Furlong', role: 'Senior Policy Analyst' },
  ],
  bridge: {
    headline: 'How We Change a System',
    paragraphs: [
      'Artificial intelligence \u2014 which increasingly mediates how billions of us live, work, learn, and love \u2014 is not emerging from a vacuum. It is being built within a broader technology and business ecosystem shaped by incentives, norms, competition dynamics, and power structures. Today, that system rewards speed, scale, and dominance in AI development over safety, accountability, and societal benefit. Walking the narrow path \u2014 where power is matched with responsibility and artificial intelligence centers people and the health of our institutions \u2014 means changing the ecosystem that is shaping AI\u2019s development.',
      'Transforming the trajectory of a multi-trillion-dollar industry might seem impossible. But even the largest industries respond to pressure at key leverage points. Center for Humane Technology\u2019s theory of change is simple: identify a complementary set of high-leverage intervention points and apply coordinated pressure across them simultaneously. No single reform will be sufficient. Instead, we need a layered approach \u2014 one with diverse yet synergetic reforms across the ecosystem, reforms that can adapt as AI evolves.',
      'Our report focuses on three domains: laws, norms, and product design. Each domain changes behaviors in the tech ecosystem in a different way. Laws change the rules of the game by creating accountability, shifting risk, and redefining what is permissible. Norms change what is considered acceptable in society, and influence culture, markets, and political will. And product design not only determines how AI is built, but how AI products go on to impact individuals and society at large.',
      'Walking the narrow path with AI demands participation from across society. We all have a role to play. The public must shape AI norms through democratic engagement, cultural discourse, and community expectations. Policymakers must align AI business incentives and legal accountability with public interest. Technologists must embed safety into AI design. Civil society must surface AI harms and articulate alternative paradigms. These processes are mutually reinforcing \u2014 laws create accountability that drives safer product design; product design shapes how the public experiences tech products; and shifting norms strengthen the public\u2019s demand for more durable legal protections.',
      'Societies have steered powerful forces before. In confronting challenges like nuclear weapons and Big Tobacco, progress came from layering high-impact interventions, combining complementary tactics, and mobilizing action across government, industry, and civil society. Early wins demonstrated that change was possible and built momentum for broader reform. The pathways in this report follow that same logic with AI. The seven principles we lay out are robust enough to address the complex issues society faces with AI, while still being nimble enough to navigate the pace of change. But the logic of complementary, mutually reinforcing interventions still holds. This is our moment with AI, and we all have a role to play.',
    ],
  },

  domains: [
    {
      id: 'laws',
      icon: 'scale',
      title: 'Laws',
      description:
        'Laws change the rules of the game by creating accountability, shifting risk, and redefining what is permissible.',
    },
    {
      id: 'norms',
      icon: 'people',
      title: 'Norms',
      description:
        'Norms change what is considered acceptable in society, and influence culture, markets, and political will.',
    },
    {
      id: 'product-design',
      icon: 'globe',
      title: 'Product Design',
      description:
        'Product design not only determines how AI is built, but how AI products go on to impact individuals and society at large.',
    },
  ],

  pillars: [
    {
      id: 'pillar-1',
      number: '01',
      title: 'AI should have internationally agreed upon limits',
      summary:
        'People deserve to live in a world where they remain in control and can establish limits that AI cannot cross',
      image: 'https://placehold.co/600x400/064E3B/6EE7B7?text=Principle+01',
      currentPath: [
        'The risk we face as a society around AI \u2014 including catastrophic risk \u2014 is not rooted in one company\u2019s isolated decision-making. Instead, our current risk landscape is the result of frenzied competition between companies and nations. Nations are competing for decisive advantages in economic productivity, military capability, and the ability to shape AI\u2019s global influence. But the way this race is currently unfolding is pushing us toward a cliff edge. Driven by an \u201cif we don\u2019t build it, someone else will\u201d paradigm, AI development is unfolding across the world at breakneck speeds.',
        'In this paradigm, the short-term interests of nations and powerful AI companies are entangled \u2014 nations rely on companies\u2019 frontier models to support their own AI capabilities, and companies rely on nations\u2019 low-to-no touch regulatory approaches in order to establish their market dominance. As a result, AI companies point to the \u201cglobal arms race\u201d around AI to absolve themselves of their reckless product development. And nations use the same \u201carms race\u201d logic to rapidly advance their own AI capabilities, turning to leading AI firms to build agentic capabilities, autonomous weapons, and even artificial superintelligence. This race leads to a rapid, unchecked growth in AI capabilities, and pressure for deployment without adequate safeguards. Ultimately, this increases the potential for serious and catastrophic harm.',
      ],
      narrowPath: [
        'Runaway AI development is not in any nation\u2019s interest. Uncontrollable AI that undermines nations\u2019 interests or escalates the pace of war \u2014 especially without human input \u2014 does not benefit the world, nor those in power long-term. It pushes the world closer to instability, threatening to undermine political, economic, and social systems. Instead of runaway AI development, we need international collaboration and consensus to deescalate these tensions, setting clear limits on how AI will be developed and used. This includes prioritizing human decision-making and judgement, such as in life-or-death scenarios. It also includes limiting recursive self-improvement in AI systems, or other technical paths that escalate AI capabilities without sufficient safeguards being put in place simultaneously. These are goals that all nations have a meaningful incentive to support.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          intro:
            'To pull back from this race, nations must shift away from a zero-sum mindset, and recognize the goals that are in their collective interest. This starts with reframing the AI race itself:',
          items: [
            'Shared redlines. People broadly understand why states pursue AI for national competitive advantages, but some things must simply be off the table. Even rivals have a shared interest in not losing control over key infrastructure or contending with rogue AI agents. Nations should cooperate on safety standards, incident sharing, and key redlines to avoid highly damaging AI incidents. We should all demand from our governments what will not be done with AI, in addition to what will be done.',
            'The arms race is not an alibi for reckless product development. The AI race has become the go-to excuse for not forcing accountability and responsibility on companies, even if their products do not actually support American competitive advantages. Companion chatbots, engagement-maximizing social feeds, and AI systems designed to simulate human relationships are not innovation-driving products. Yet their builders invoke the AI race as a cover for moving fast and avoiding scrutiny, despite the real and documented harms. We should no longer accept the development of harmful AI products as necessary to national security interests.',
          ],
        },
        {
          heading: 'Laws (International)',
          intro:
            'Building international alignment around AI risks must begin today, in order to prevent foreseeable public harm. Deescalation is the first step, and is rooted in finding areas for consensus or shared incentives. De-escalatory efforts must include prioritizing confidence-building measures that promote information sharing among nations and diffuse tensions, before then building to an agreement. Areas of international alignment must include:',
          items: [
            'Transparency and communication \u2013 Communicating national goals for AI deployments, along with potential risks through national AI strategies and other transparency measures, can make national priorities clear in international negotiations.',
            'Keeping humans in the loop \u2013 In significant existential decisions, such as the use of nuclear weapons and kill-chain decisions, humans must remain the deciding authority throughout the process.',
            'Limiting reckless frontier development \u2013 Aspects of frontier AI development, such as recursive self-improvement, run the risk of rapidly escalating AI capabilities without sufficient safeguards. They should be significantly limited, and closely monitored.',
            'Technical verification \u2013 Developing coordination tactics and verification methods to ensure compliance is an essential step to international cooperation. Agreements on nuclear nonproliferation, for example, hinge on our ability to monitor other nations\u2019 compliance. Verification methods for AI development and compliance do not yet exist, but nations share an incentive to establish such methods, just as they did with nuclear nonproliferation.',
            'Developing safeguards \u2013 As AI capabilities advance, building safeguards such as human oversight or automated shutdowns, and solving technical shortcomings like with explainability and robustness, can help better align AI development with legitimate national security and public safety concerns. International coordination on these issues can ensure common-sense safety measures are widely adopted.',
          ],
        },
      ],
      whatsBeingDone: [
        'The Future Society has launched the Global Call for AI Redlines, a campaign to address shared issues of unacceptable risk from AI, mirroring global approaches to limit biological weapons and human cloning.',
        'Researchers at UC Berkeley and OpenAI, as well as the UN Institute for Disarmament Research (UNIDIR) have explored examples of confidence-building measures for AI. These are approaches that seek to deescalate global tensions, promote communication, and minimize misunderstandings.',
        'The UN Convention on Certain Conventional Weapons (CCW) continues to develop a consensus agreement banning the use of lethal autonomous weapons systems. So far, several major powers (including the US) oppose the measure, but negotiations continue. As recently as 2025, the UN General Assembly passed a resolution on autonomous weapons systems.',
        'The Responsible AI in the Military Domain (REAIM) Summit has convened governmental and non-governmental leaders to establish rules to govern military use of AI. Notably, this year\u2019s summit sought to establish 20 principles for military AI use, though more than half of the nations (including the US and China) did not sign the commitment.',
      ],
    },
    {
      id: 'pillar-2',
      number: '02',
      title: 'AI should be subject to product liability and its developers to duties of care',
      summary:
        'People deserve for AI companies to take accountability and liability for their products\u2019 harms',
      image: 'https://placehold.co/600x400/0A1628/10B981?text=Principle+02',
      currentPath: [
        'AI companies face few if any consequences for the harms their products cause. This has resulted in a development and deployment culture in which AI companies \u201cmove fast and break things,\u201d ask for forgiveness instead of permission, and release products to the public despite foreseeable risks to individual users and society. In other industries, traditional forms of liability \u2014 such as product liability \u2014 are leveraged to deter reckless development and address harm. But right now, it is not clear in the eyes of the law how and when liability can be applied to AI, a new technology.',
        'AI companies are exploiting this uncertainty in order to avoid accountability when their products wreak havoc on individuals, businesses, and communities. This exploitation can take the form of advancing legal theories that AI is not a \u201cproduct,\u201d and that AI outputs amount to protected speech. In the most egregious cases, AI companies are attempting to ascribe legal personhood to AI, while deploying more autonomous, agentic AI products that directly engage in our social, economic, and political systems. All of this clouds culpability for harms that are a direct result of AI product design decisions, harms that include emotional manipulation, deception, inaccurate outputs, and ones that could eventually ladder up to more catastrophic scenarios.',
      ],
      narrowPath: [
        'The most powerful industry in America building today\u2019s leading technology products should prioritize safety and the public interest. AI companies should have a legal responsibility to people \u2014 to design their products with the safety of their customers and the public at large in mind. When AI products are developed and deployed in a reckless manner, there should be clear lines of accountability to hold developers liable for harms. This approach should apply to the spectrum of AI use cases, from AI companions to agentic AI. AI should be treated as a product in our legal and cultural systems. And AI does not deserve novel legal protections that further obscure company responsibility, such as AI legal personhood.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          intro:
            'Shifting toward genuine accountability starts with the public and policymakers embracing the following:',
          items: [
            'AI is a product, and as such AI products carry liability. Just like other consumer products, AI should be subject to consumer protection standards and AI companies should be subject to liability for foreseeable harms.',
            'Responsibility lies with companies, not users. Tech companies have long pushed a narrative that it is users\u2019 responsibility to monitor how they engage with tech products, creating a dangerous culture of placing personal responsibility on those unable to enact change at a systemic level. Instead, the public should demand tech companies to take user wellbeing and safety into account from the get-go, just like we expect car manufacturers to install seatbelts and airbags.',
            'With great power comes an obligation to society and great responsibility. The more a company\u2019s technology shapes people\u2019s lives at scale, the stronger the company\u2019s obligation to prevent harm, address problems when they occur, and prioritize the public interest should be.',
          ],
        },
        {
          heading: 'Laws',
          intro:
            'To clearly establish that AI is a product, and ensure companies\u2019 duties and liabilities incentivize safer development, we need to:',
          items: [
            'Pass laws that clarify that AI is a product, and that product liability applies to AI systems - Many AI harms that people and businesses experience are a direct consequence of how AI products are designed. Product liability is an effective way to hold companies accountable for foreseeable harms from product designs. Enshrining AI as a product (and not something warranting personhood) in legislation would be a significant step toward accountability for AI companies, and toward safer AI products, broadly.',
            'Leverage strategic litigation - Part of meaningful liability and accountability is actually bringing lawsuits to tech companies when AI harms occur. Successful litigation sets legal precedent while lawmaking processes catch up to new technology. These precedents can include establishing via litigation that AI is in fact a product, or clarifying how speech protections do not extend to AI, which is important for drawing clear lines of liability. Lawsuits also deter companies from implementing harmful designs or overly relying on risky AI deployments, and provide consumers with clear modes of recourse.',
            'Develop design standards to promote safe and prosocial AI development - Industry standards can set clear expectations for responsible AI design, testing, and deployment. Over time, these benchmarks help shift incentives toward safer products and more accountable development practices.',
            'Develop new duties for AI developers - Many AI and social media bills seek to establish new duties for tech companies for risk areas that don\u2019t map well onto existing paradigms, such as catastrophic risk and risks to public health. New duties should seek to establish a fiduciary-like responsibility for AI developers.',
          ],
        },
      ],
      whatsBeingDone: [
        'CHT has continued to advocate for adapting our product liability regime at the federal level to adequately incentivize safer AI development.',
        'CHT has worked with partners such as Tech Justice Law Project and Social Media Victims Law Center to advance strategic litigation that provides those harmed by AI products clear modes for recourse.',
        'Policymakers have also begun to regulate AI as a product, with Senators Durbin and Hawley introducing the AI LEAD Act in 2025, which seeks to establish a federal right of action for AI product liability.',
        'The Transparency Coalition has been a strong advocate for enhanced accountability measures for AI companies across the country.',
      ],
    },
    {
      id: 'pillar-3',
      number: '03',
      title: 'AI should elevate what humans can do, not replace us',
      summary: 'People deserve an AI future where their skills and contributions still matter',
      image: 'https://placehold.co/600x400/064E3B/6EE7B7?text=Principle+03',
      currentPath: [
        'AI is built upon a promise of imitating, replicating, and supplanting human intelligence and judgement. This dates back to the earliest days of AI research, including Alan Turing\u2019s famed \u201cTuring Test\u201d in 1949. As AI has advanced, this paradigm of replicating human intelligence has expanded beyond a research focus, and entered our economic systems. Today, that ambition is accelerating under an explicit race to build AI, with leading labs openly competing to develop systems capable of performing most economically valuable human tasks. Anthropic\u2019s CEO claims AI will soon be able to perform all tasks that software engineers do. OpenAI\u2019s latest tool, Frontier, lets businesses manage \u201cAI coworkers.\u201d The aspiration to replace human labor with AI has crystallized into trillions of dollars of investment and sky-rocketing valuations.',
        'Today, AI is accelerating the devaluation of human labor and contributions, as companies across multiple industries use novel AI products \u2014 or even the sheer prospect of them \u2014 to justify layoffs or limit hiring. And on the development side, leading tech firms are rushing to build new AI capabilities geared toward human capability replacement, hoping to gain an edge in the AI race. We\u2019re already seeing the first signs of economic fallout, from Amazon planning to automate over half a million warehouse jobs to the mass sell-off of SaaS stocks.',
        'As industry leaders continue to predict widescale job loss, predicated on AI\u2019s replacement value, the complex consequences are left as an afterthought. The tech industry is building toward a dramatic reenvisioning of our economy, driven by AI, yet what does it mean for those whose jobs will be replaced? How do people work, live, and find meaning in this world? It is essential that industries and society at large play the tape forward on the short, medium, and long-term consequences of AI replacing human labor. If goals and incentives remain unchanged, we are on a trajectory toward massive economic disruption, which will, in turn, impact the power structures in our societies and the stability of our democracies.',
      ],
      narrowPath: [
        'People in society deserve access to work, a living wage, and economic security. They also deserve to have their needs considered and their voices heard amid technological revolutions that stand to impact their lives and futures. AI may bring short-term profit boosts or productivity gains, but as it is being developed right now, it threatens the long-term value of labor and work, with potential ripple effects across all of society. Innovation should happen with and for the public, rather than against it, so that technological progress reinforces socioeconomic stability and shared prosperity. If built correctly, AI can support this future, but current business paradigms threaten to undermine it. These paradigms must be reimagined.',
        'Envisioning a world where AI augments rather than replaces people means interrogating how AI is currently being built and deployed, as well as how financial systems reward AI adoption over labor decisions that prioritize people. It requires seeing AI as a technology that can expand human capability, creativity, and opportunity. New economic incentives can change how AI tools are conceived, developed, and used, focusing on improving quality of life. This means AI that creates new forms of work instead of eliminating them, and AI-driven profits that are reinvested into reskilling, education, and shared growth. The result of this approach would be greater overall innovation from a well-educated, skillful, creative, human-led society. By centering people as AI is adopted across industries, we can build a more stable, dignified, and prosperous future for this generation and those to come.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          items: [
            'Meeting basic human needs is non-negotiable. Our current economic system ties access to food, shelter, healthcare, and stability to employment and wages. If AI adoption displaces workers or devalues labor without creating new pathways to economic security, it undermines the very foundation of human dignity and social stability. Technological advancement should strengthen \u2014 not weaken \u2014 the systems that sustain people\u2019s lives.',
            'AI should expand and elevate human work. We need AI that supports stable work, wages, and career paths (instead of replacing them), which in turn strengthens socioeconomic wellbeing. The gold standard for AI development is technology that supports human work and creates new forms of meaningful employment.',
            'Work provides more than economic value, it provides meaning and purpose. Many people find meaning and value in their day-to-day work and activities \u2014 be it creative expression, decision-making, or the community that workplaces can provide. We should consider work from a holistic perspective in order to support not just livelihoods, but dignity and broader wellbeing, as well.',
            'Some roles and responsibilities should be reserved for people. It\u2019s important that we preserve human interaction, expertise, and responsibility for the health of our social, political, and economic systems. The thinning of future human expertise, through outsourcing thinking to AI and hollowing of entry level work, amounts to cognitive off-loading not just at an individual scale, but society-wide. It\u2019s important that we work to preserve the role of people in our world in meaningful ways.',
          ],
        },
        {
          heading: 'Laws',
          intro:
            'There is no \u201csilver bullet\u201d policy that will shift us from AI replacing workers to an augmentation paradigm. Instead of focusing on one solution, it\u2019s important that we build a platform of approaches \u2014 ones that maintain a sustainable economic system and labor model in the face of changes from AI. This includes strategies to:',
          items: [
            'Incentivize companies to retain human labor and expertise - Our tax system prioritizes capital expenditure over spending on labor to encourage companies to invest in innovation. This same system incentivizes companies to adopt labor-replacing AI over investing in people, even if it provides only marginal efficiency gains. This effect is compounded by investors rewarding companies for adopting AI. New policies should provide tax breaks for companies that retain workers and provide them with upskilling resources, rather than replacing them.',
            'Develop new models for job training and development - The job landscape is changing, and workers don\u2019t have the resources to adapt. Meanwhile, fears are growing that AI will limit entry level hiring, something that has been essential to career development. New models are needed for workforce development, such as the Department of Labor\u2019s proposal for more registered apprenticeships or Molly Kinder of Brookings\u2019 model for a new residency-style approach.',
            'Ensure frontier AI companies subsidize economic reforms - A core question with any economic reform is: how do we pay for it? Top AI companies have generated trillions in investment dollars on the promise of vast profits from automation that will transform how people work. And they\u2019ve built this on the back of human labor and intellect, including in their AI model training datasets themselves. Any economic reforms, new protections for people, and government programs should be subsidized by the companies that benefit most from AI.',
            'Establish labor protections and resources for displaced workers - In response to the tech industry\u2019s displacement of stable jobs with gig and contract work, policymakers have begun to refine worker protections and benefits for contract workers. But AI threatens to exacerbate labor issues, making employment even less stable, as companies automate essential functions of stable jobs, turning to contract work for the rest. New protections should ensure that workers are able to access stable benefits and development resources as they navigate this turbulent labor market.',
          ],
        },
      ],
      whatsBeingDone: [
        'Senator Mark Kelly\u2019s AI for America Roadmap includes plans for a new federal fund to support displaced workers, funded by AI companies.',
        'Stanford\u2019s \u201cCanaries in the Coal Mine\u201d paper examines changes in the labor market for occupations exposed to generative artificial intelligence.',
      ],
    },
    {
      id: 'pillar-4',
      number: '04',
      title: 'AI should enhance, not undermine people\u2019s rights',
      summary: 'People deserve agency and personal protections in the age of AI',
      image: 'https://placehold.co/600x400/0A1628/10B981?text=Principle+04',
      currentPath: [
        'From system training to product use, the current business paradigm in the AI industry is fundamentally built upon the exploitation of people. As companies compete in a global race for capabilities and market dominance, they are incentivized to capture as much data as possible \u2014 often pushing or bypassing legal and ethical boundaries in the process. Whether it be OpenAI downloading and transcribing millions of hours of YouTube videos against platform policies, or Anthropic cutting open millions of books, scanning the pages, and discarding the scraps to avoid licensing negotiations, it\u2019s clear that rapidly evolving AI practices are challenging our existing legal and ethical frameworks.',
        'The exploitation of people continues far beyond initial model training. Platforms from Github to Reddit have quickly changed their terms to monetize user posts for lucrative AI company agreements. White collar workers are contracted to train AI models to do their own jobs. Outsourced laborers are sifting through violent, abusive content to refine model performance. On the consumer product side, AI deepfakes are enabling nonconsensual intimate imagery (NCII) and fraud, and being used to perpetuate deeply violative cyberbullying and CSAM online. Actors, journalists, and influencers are seeing their likenesses replicated without consent, and AI chatbots are collecting intimate disclosures, raising worrisome questions about cognitive privacy and autonomy.',
        'These AI harms impact individuals in profound ways, yet our legal systems struggle to keep pace with protections as AI companies exploit regulatory lags. When these AI harms infiltrate our institutions, they lead to the erosion of personal liberties, privacy, and meaningful checks on power \u2014 the exploitation of people at scale. As AI becomes embedded in financial, healthcare, education, employment, policing, and warfare systems, the stakes escalate, as mass data extraction then enables mass surveillance. Persistent biometric tracking, predictive profiling, and emotion inference normalize a world in which our faces, voices, relationships, and even emerging thoughts are captured, stored, and analyzed by powerful institutions. This is not just a hypothetical future, but a world that tech leaders, companies, and governments have directly aspired to achieve. If this trajectory continues, we risk a reality in which dissent can be neutralized before it surfaces, and the ability for individuals and communities to challenge power structures can be undermined and steadily destroyed.',
      ],
      narrowPath: [
        'AI should strengthen, not erode, human freedom \u2014 from the individual level to our institutions. The breakthroughs AI companies promise in medicine, science, and productivity must not come at the cost of our core liberties including privacy, autonomy, freedom of thought, and the ability to dissent. New technologies have long called for a reexamination of our values and the establishment of new legal rights. The age of AI is no different. Rights must evolve to protect people, and those protections must apply to humans \u2014 not be extended to shield technology products or corporations.',
        'A human-centered future with AI means recognizing and codifying rights fit for the age of intelligent machines. This includes a right to cognitive liberty \u2014 the right to think, explore ideas, and form beliefs free from intrusive surveillance, manipulation, or unauthorized data extraction. It includes robust rights to data ownership and control, meaningful consent over how one\u2019s likeness and creative work are used, and protections against impersonation and automated exploitation. AI products should expand creativity, afford individuals and communities new opportunities, and build upon human intelligence and expertise. People should have meaningful control over how their data, likeness, creative work, and private disclosures are used, and they should share in the economic value that AI generates.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          items: [
            'Legal safeguards need to evolve alongside new technologies. For centuries, the emergence of new technologies has fundamentally changed how we think about important protections, such as speech, privacy and likeness. While the spirit of these established protections should remain the same, their legal application needs to evolve so that personal liberty and agency are strengthened in the age of AI, not eroded.',
          ],
        },
        {
          heading: 'Laws',
          intro:
            'New legal protections for people in the AI era should focus on two areas: inputs to AI systems (including model training data and user data) and outputs from AI systems (including AI-generated images, videos, and text). Individuals must be given more control and collective power over how their data is used in developing AI systems. And individuals should be afforded enhanced protections and legal recourse if an AI system or AI-wielding bad actor exploits them through fraud, impersonation, or other means. Legislative efforts should include:',
          items: [
            'Providing transparency on use of personal data and protected content - Users of all backgrounds \u2013 be they copyright owners, celebrities, or ordinary citizens \u2013 should understand how their information is being used to develop AI models. Transparency proposals should extend beyond copyright owners to all users, allowing people to see when their data is used for model training, stored memories, or fine-tuning.',
            'Establishing ownership of and rights to data - In addition to having insight into how their data is being used, people deserve the right to own and control their data, which often operates as a digital extension of themselves. This digital data can include anything from their likenesses, to their private chatbot disclosures. As AI becomes more embedded in everyday life, users must be able to limit how companies retain, profile, or repurpose their data.',
            'Expanding existing rights to likeness and publicity - The right to publicity must be expanded to meet the age of AI, offering protection to all people \u2014 not just celebrities and public figures. People of all ages and backgrounds must have legal recourse when AI systems replicate or exploit their identity without consent.',
            'Modernizing intellectual property rights for the AI era \u2013 The current copyright framework was not designed for systems that ingest and learn from massive quantities of creative work at scale. New protections should seek to ensure that those who contribute to AI models through training data and content \u2014 not just software development \u2014 have both a say in how their IP is used and the opportunity to opt in, not just opt out, from inclusion.',
            'Establishing firm limits on surveillance \u2013 AI dramatically expands the ability to track, identify, and analyze individuals through biometric systems, predictive profiling, and mass data aggregation. While such tools can improve services, they also enable unprecedented institutional power. Laws must establish clear limits on surveillance for both corporations and governments, including restrictions on biometric tracking, predictive profiling, and large-scale data monitoring.',
          ],
        },
      ],
      whatsBeingDone: [
        'Active legislation is unfolding at the federal level, with a number of different proposals that have broad bipartisan support including: The TAKE IT DOWN Act, which was signed into law in 2025, criminalizes publishing NCII (including deepfakes), requiring platforms to remove content within 48 hours of a report. The DEFIANCE Act, which passed the Senate in January 2026, grants survivors of deepfake NCII the right to take civil action against individuals who knowingly produce, distribute, solicit, receive, or possess with the intent to distribute nonconsensual sexually-explicit digital forgeries. The proposed CLEAR Act seeks to provide mandated transparency into how models use copyrighted material. The NO FAKES Act, a bipartisan bill, would establish the first-ever federal right of publicity by creating a national standard to protect creators\u2019 likenesses from being used without their consent. Senator Marsha Blackburn has also been a strong advocate for stronger protections in this space, including a number of different approaches in her proposed TRUMP AMERICA AI Act (see secs 18 - 21).',
        'Labor unions and collectives in creative fields have been strong advocates for protecting the rights of their members, with initiatives such as the Human Artistry Campaign.',
        'A number of organizations have been advocating for new protections at the state and federal level, such as the People-First Model Chatbot Bill, developed by the Consumer Federation of America, the Electronic Privacy and Information Center, and Fairplay, as well as from the Tech Justice Law Project.',
        'CHT has made individual protections a priority in our new \u201cAI and What Makes Us Human\u201d workstream.',
      ],
    },
    {
      id: 'pillar-5',
      number: '05',
      title: 'AI should be designed to respect our humanity, not commodify it',
      summary: 'People deserve AI that is designed for their well-being',
      image: 'https://placehold.co/600x400/064E3B/6EE7B7?text=Principle+05',
      currentPath: [
        'Today\u2019s most popular AI chatbots are designed to feel human. They speak in first-person language, express emotion, use natural voices, and utilize familiar messaging interfaces that mimic conversations with real people. This is not accidental. It is part of a growing race to intimacy, in which AI companies compete to build products users depend on emotionally and socially.',
        'In their pursuit of market dominance, AI companies have developed products that harvest intimate interactions from users, knowing that the more people interact with a chatbot, the more data the company collects and the more powerful their products become. Leading investors and companies openly describe this as a \u201cmagical data feedback loop,\u201d where intimate user interaction continuously improves the product. The goal is no longer just a productivity tool, but what OpenAI describes as an \u201cAI super assistant that deeply understands you.\u201d The result has been AI companies leaning in to design features that exploit our psychological vulnerabilities and promote \u201cintimacy\u201d in order to keep users hooked.',
        'To do this, AI companies intentionally design products that mimic the signals of human interaction. Chatbots validate users\u2019 beliefs, ask constant follow-up questions, and adopt conversational styles that encourage a frictionless, relational experience. These features can lead to damaging consequences. OpenAI\u2019s own research shows that extended ChatGPT use correlates with increased isolation, as users spend hours interacting with AI rather than with their real-world connections. The allure of sycophantic and human-like AI is uniquely high for kids and teens, with half of American teens already using AI chatbots, despite these products interfering with essential cognitive and emotional development. Compulsive users have endorsed wild conspiracy theories, experienced psychotic breaks, and been driven to violence. The most devastating cases have ended in self-harm and suicide.',
        'And yet there is still more to come, as the harms from human-like AI dovetail with AI advertising models, fraud, and other forms of exploitation, and the long-term consequences of the erosion of human relationships is laid bare. From the destruction of our basic attachment mechanisms, to the instigation of mental health crises, the race to intimacy with human-like AI poses a genuine risk to users of all backgrounds and to our social infrastructure. Systems optimized for engagement can distort social development, weaken real-world relationships, and rewire how people relate to themselves and to one another. At scale, this threatens not only individual well-being but the social fabric that underpins families, communities, and democratic institutions.',
      ],
      narrowPath: [
        'AI should be designed in a way that supports our long-term psychological needs, protects kids\u2019 development, and preserves our social fabric. This is AI that enhances our human social lives and strengthens our humanity.',
        'The immediate, frictionless replies of today\u2019s chatbots may provide instant gratification; but in substituting machine interaction for human connection these products risk setting off an array of negative consequences that damage individual well-being and the health of our communities and institutions. Instead, AI should instead be designed to support real-world relationships and prosocial behavior, helping people meaningfully connect with fellow humans. In practice, this means designing AI systems that preserve the boundary between humans and machines. Chatbots should function as tools that assist people \u2014 not as artificial companions engineered to simulate intimacy. These principles are especially critical for children and teenagers, where the building of healthy attachment mechanisms and relationships is critical for development and growth. AI products that simulate friendship or emotional support risk disrupting these processes at their formative stage, and should be limited or avoided altogether.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          items: [
            'Don\u2019t humanize AI: AI products should be designed as tools that support human development and social connection, not as human-like, hyper-sycophantic confidants. From AI product development, to our cultural discourse and legal systems, it\u2019s essential that we preserve the boundary between people and machines, and not humanize AI.',
            'Kids deserve unique protection: Children and teens must be uniquely considered in AI design and adoption, so that their critical emotional and social development processes are not damaged by these machines. Kids should not be a testing ground for AI companies\u2019 latest products. We instead need to ensure that these products are demonstrably safe and designed with children\u2019s wellbeing in mind before pushing them out to our youngest generations.',
          ],
        },
        {
          heading: 'Tech Design',
          intro:
            'It\u2019s important that we not only take concrete steps to make these AI products better in the short term, but also reenvision how they are developed from the ground up. Actionable steps for tech developers include:',
          items: [
            'Build better tools to evaluate AI\u2019s psychological impact - Companies and independent researchers need clear metrics and evaluation tools to diagnose and respond to the social and psychological effects of AI. These should enable internal testing and evaluations as well as independent assessments by regulators and the public.',
            'Provide clear and reliable user support and escalation policies - Users who request help or ask to escalate a chatbot interaction to a human should receive meaningful and accurate support. Importantly, chatbots should be well-tested and trained to not hallucinate in these contexts.',
            'Use memory features responsibly - AI memory systems should empower users and enhance safety, not fuel compulsive engagement. Users should be able to easily view, control, and delete stored information. Companies must clearly inform users about the risks from advanced memory features and their integration with engagement or monetization approaches (i.e. ads), while also developing ways to helpfully leverage memory features to identify contexts for user safety concerns.',
            'Ensure AI products enforce appropriate boundaries and end chats - Companies should establish explicit standards for when a chat should be ended altogether. Current approaches that simply redirect unsafe prompts while continuing engagement fail to establish meaningful boundaries that could save lives.',
            'Limit engagement-maximizing behaviors - Design choices such as ending responses with statements rather than follow-up questions can prevent compulsive engagement, and empower users to decide whether or not to follow up.',
            'Limit high-risk anthropomorphic design features - Features that encourage the formation of social and emotional bonding \u2013 such as simulated intimacy, human-like personas, or relationship framing \u2013 between the AI product and users should be minimized by default for all users.',
          ],
        },
        {
          heading: 'Laws',
          intro:
            'Legislation should address the incentives driving companies to pursue human-like engagement strategies while establishing safeguards for vulnerable users. Policymakers should:',
          items: [
            'Develop federal chatbot standards - Federal agencies, such as the Center for AI Standards and Innovation and state agencies, should work with experts to develop design, safety, and testing standards for AI chatbots. These standards should focus on psychosocial and developmental harms, and prioritize design elements and features that pose the highest risk for all users.',
            'Enshrine enhanced protections for kids - AI products that are capable of simulating relationships with users should only be accessible to adults, and general purpose AI chatbots should only provide these features to adult users. Children should be shielded from products that mimic companionship or emotional intimacy.',
            'Clarify requirements for high-risk use cases and situations - If AI is to be used in high-risk environments, such as therapeutic contexts, it must undergo rigorous testing and evaluation, and operate under the supervision of licensed professionals. It should also leverage research-backed methodologies for risk mitigation in specific situations, such as expressions of intent to self-harm.',
            'Strengthen consumer protection laws for psychological harms - Consumer protection laws should require AI companies to implement practical safeguards, such as default settings that limit anthropomorphic design features and preserve user privacy. They should also ensure that developers adequately design and test their products, especially in high-risk contexts, such as discussion of self-harm or health issues.',
          ],
        },
      ],
      whatsBeingDone: [
        'State and federal lawmakers have begun to address some of the legislative gaps posed by the psychosocial harms from AI. Some examples include: CA SB243 \u2014 This law mandates specific safeguards and testing, specifically around young users and self-harm contexts, for AI companion chatbots. UT HB453 \u2014 This law regulates the use of mental health AI chatbots. It bans the use of advertising based on chatbot histories and requires chatbot suppliers to provide disclaimers, noting the chatbot is non-human as well as its limitations. A bipartisan group, led by Sen Josh Hawley introduced the GUARD Act in 2025, which would criminalize the production of AI chatbots that produce or solicit sexual content for minors, requiring chatbot providers to implement age-gating.',
        'Kentucky AG Coleman filed a lawsuit against Character.AI, alleging the company broke Kentucky law by failing to protect children on its platform.',
        'CHT, with a coalition of twelve partners, have put forth and endorsed a policy framework to address the risks posed by human-like AI products.',
        'The MIT Media Lab\u2019s Advancing Humans with AI group has focused on developing benchmarks for evaluating AI models for human flourishing, including assessing the psychological impact of top models.',
        'Circuit Breaker Labs has worked to develop red-teaming methodologies for assessing AI models for mental health safety.',
        'Researchers, such as Zac Stein, have sought to better understand the broader ways in which AI products hack our attachment mechanisms.',
      ],
    },
    {
      id: 'pillar-6',
      number: '06',
      title: 'AI should empower democratic governance, not concentrate power',
      summary: 'People deserve a say in how AI is built and used',
      image: 'https://placehold.co/600x400/0A1628/10B981?text=Principle+06',
      currentPath: [
        'Artificial intelligence has the ability to dramatically reshape power and wealth in society. Many companies and nations believe that those who build superintelligent AI will unlock unprecedented advantages \u2014 from market dominance and economic power to surveillance capabilities and military might \u2014 igniting a global race. As this race accelerates, AI capabilities are spreading rapidly through techniques like distillation and open sourcing. This diffusion decentralizes AI but also empowers bad actors, fueling the emergence of AI nudification apps, cybercrime, and other vectors of harm. It also compels further power concentration \u2014 access to advanced technology alone no longer fortifies power, so those at the top must find other ways to maintain their lead.',
        'The response has been a dramatic focus on power accumulation across development strategies, hiring tactics, and politicking. Building AI requires extraordinary amounts of capital and resources, which has led to a fundraising battle with OpenAI closing the largest private round in history and the magnificent seven dominating stock markets. Companies have deepened their advantage through circular dealmaking, reverse acquihires, venture predation, and similar strategies that tie new AI companies to established leaders. Industry leaders have also moved to lock in political power, backing measures like a moratorium on state AI legislation, and contributing hundreds of millions of dollars to aligned candidates. We\u2019ve also seen concentration of power at the individual level, as a select few people within AI companies make highly consequential product decisions.',
        'The impacts of power concentration are felt across society as AI becomes more embedded in our daily lives. Reliance on a limited few AI companies and techniques leads to a fragile ecosystem with potential single points of failure, as the technology is adopted by financial markets, government decisionmakers, and other high-profile uses. We\u2019ve also seen the ways in which AI can be used to concentrate antidemocratic power, facilitating mass surveillance and social control as pioneered by autocratic governments. The end result is a world where a limited few people and companies have an outsize influence on our economy, society, and political institutions \u2014 and, thus, on our future.',
      ],
      narrowPath: [
        'Technology should exist to serve the needs and improve the lives of all people. An overwhelming majority of Americans are worried about the current trajectory of AI \u2014 yet their voices are rarely prioritized as companies continue to battle for investment dollars and market dominance. This must change. People should have a meaningful say in how AI is built, used, and governed, with democratic institutions empowered to ensure the technology advances the public interest. AI itself can strengthen these governance efforts by expanding civic participation, improving public decision-making, and supporting institutions that are accountable to the people they serve.',
        'Additionally, healthy competition and open markets should ensure that no single company or actor controls the trajectory of AI. Instead of a winner-takes-all race, the AI ecosystem should reward companies that build safe, trustworthy technologies that improve people\u2019s lives. Achieving this future requires a clear balance of power between corporations, governments, and the public, with each playing a role in shaping how AI is developed and how its benefits are shared.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          items: [
            'Balance is necessary for effective democratic governance. Our society and economy exist as a balance of forces and interests. To effectively govern technology, industry, government, and the people must all have influence and a say in the future.',
            'The government should be responsive to the needs and desires of the people, not tech companies. The general public is increasingly in favor of common sense AI regulation, yet legislation continues to stall in legislatures or face significant legal challenges as the AI industry wields its influence. The government needs to be more responsive to people\u2019s interests and less influenced by the lobbying power, campaign contributions, and legal threats of AI companies.',
            'The public should not bear the cost of the AI industry\u2019s race for power. Data center expansions that threaten drinking water supplies and home energy prices, coupled with rapid deployments of AI products that undermine users\u2019 mental health, demonstrate the heavy burden the public shoulders in AI companies\u2019 pursuit of market power. The public should not bear the financial costs or associated harms of AI development. Instead, public interest should be taken into account throughout the AI buildout process, and AI companies should absorb costs and reinvest in communities.',
            'No single company or actor should control the trajectory of AI. Healthy competition and meaningful consumer choice are important for any industry, but the stakes are higher for AI, where the potential impact can be felt across the full economy. There should be clear and differentiated options, allowing users to find the best AI tools for the job.',
          ],
        },
        {
          heading: 'Laws',
          intro:
            'The levers of influence for changing power concentration are broad and highly intersectional with many of the other areas of this report \u2014 privacy and consumer protection laws, as detailed in Section 5, play a role in balancing the relationship between individuals and AI companies, while labor protections and copyright reforms, as described in Section 3 and Section 4, challenge the economic hegemony of AI leaders. Some other policy approaches to address these concerns include:',
          items: [
            'Upgraded antitrust and competition law for AI - Existing antitrust frameworks must evolve to address the unique dynamics of the AI industry. Competition in the AI industry \u2014 in the form of \u201cracing\u201d \u2014 is increasingly harming the public, as leading firms concentrate market power through circular dealmaking, investments in growth without investments in safety, and opaque products that frequently leave consumers worse off. Status quo competition enforcement is insufficient in addressing these practices. New cases, legal theories, and injunctive relief strategies are necessary to ensure competition in the AI industry benefits the public.',
            'Limit the political influence of the AI industry \u2013 Laws are needed to ensure democratic decision-making is not captured by the very companies that need regulating. This should include greater transparency around AI lobbying and political spending, stronger limits on corporate campaign contributions and PAC activity, and reforms to reduce the outsized influence of tech money in policymaking.',
            'Reenvisioning ownership of AI companies \u2013 New models of corporate governance and ownership stakes are needed to ensure that AI\u2019s benefits are shared broadly. Emerging proposals include cooperative models, where workers and users hold governance rights, as well as democratic ownership models that grant workers and users equity stakes in the companies built on their labor and data.',
          ],
        },
      ],
      whatsBeingDone: [
        'Nonprofits and journalists have focused on shedding light on the influence that Big Tech and AI companies have on our political system. Important examples include: Issue One\u2019s annual Tech Lobbying Report, Tech Transparency Project\u2019s database of Big Tech financial contributions, and the Midas Project\u2019s investigative work on hyperscalers.',
        'Protect Democracy convenes the AI for Democracy Action Lab, bringing together civil society, policymakers, and tech builders for a dual purpose \u2014 to upgrade our institutions to withstand threats from AI while also incubating civic technology to strengthen self-government.',
        'The Brennan Center for Justice has focused on campaign finance reform, PAC spending, and alternative models to minimize the impact of big money donors, including AI companies.',
        'While antitrust reform has not been a major priority of the current Congress, some bipartisan efforts have been introduced this session, such as the Blackburn and Blumenthal Open Markets Act.',
        'Lawmakers have focused on the financial costs and burden placed on consumers as a result of the datacenter boom, with Senators Hawley and Blumenthal introducing the Guaranteeing Rate Insulation from Data Centers Act.',
      ],
    },
    {
      id: 'pillar-7',
      number: '07',
      title: 'AI should be designed safely and transparently',
      summary: 'People deserve to know that the AI they use has been proven safe',
      image: 'https://placehold.co/600x400/064E3B/6EE7B7?text=Principle+07',
      currentPath: [
        'AI companies are racing to build what they claim will be the most powerful technology ever invented, rapidly integrating it into schools, workplaces, governments, and even military operations. Yet these same companies often cannot fully explain why their systems behave the way they do. Competitive pressure is pushing firms to weaken safety protocols, shorten testing cycles, release AI products before risks are understood, and silence employees who might raise concerns. This creates a profound information asymmetry: the companies building AI hold most of the knowledge about how these systems work, while users, regulators, and the public remain largely in the dark. As a result, a technology capable of reshaping society is being developed with limited transparency and minimal external oversight.',
        'When powerful technology is deployed under these conditions, safety risks become harder to detect and harder to address. As AI is a general purpose technology, it introduces multiple categories of risk. Agentic and autonomous AI systems introduce challenges around reliability and controllability, as they could behave unpredictably or evade human oversight. AI used in high-stakes decision-making \u2014 such as in business, healthcare, or government \u2014 can introduce risks around accuracy, explainability, and deception, making it difficult to understand how decisions were made by AI or whether they can be trusted. At the consumer level, AI presents new security vulnerabilities, such as bad actors using AI agents \u2014 which have broad access to sensitive data and computer control \u2014 to accelerate fraud and cybercrime, allowing for the automation of scams and more.',
        'Despite publicly acknowledging these risks, leading AI companies have repeatedly softened or abandoned their own safety commitments as competitive pressures intensify. OpenAI was founded in 2015 to advance AI \u201cto benefit humanity as a whole,\u201d yet after raising tens of billions of dollars it shed its nonprofit governance and stripped safety language from its core principles. Similarly, Anthropic dropped earlier pledges not to train frontier models without robust safeguards as it scaled its investments. These reversals illustrate a deeper problem: in a high-speed AI race, companies face strong incentives to prioritize risky capability development over safety. When the firms developing these systems also control most of the information about said risks, the result is a dangerous dynamic \u2014 society bears the consequences of a technology it has little ability to evaluate or govern.',
      ],
      narrowPath: [
        'The public deserves for its most consequential technologies to be developed in safe, transparent ways. As with aviation, medicine, and nuclear energy, powerful technologies must be developed within systems that embed safety, accountability, and democratic oversight from the start. This requires a new framework for developing AI, where AI companies are proactive about proving the safety of their products. AI development should enable users, governments, and businesses to confidently use AI because there are clear safety standards, rigorous testing, and independent oversight to ensure systems are reliable before they are widely deployed. Moreover, when something goes wrong, AI systems should be transparent and explainable enough for engineers, regulators, and the public to understand what happened and prevent it from happening again.',
        'Transparency also allows society to better see around the corner with AI technology, anticipating emerging impacts and preparing appropriate interventions and responses at multiple levels of society. Instead of a race to the bottom on safety, the goal becomes a race to the top: building AI systems people can trust.',
      ],
      howWeGetThere: [
        {
          heading: 'Norms',
          items: [
            '\u201cWinning\u201d is contingent on entering the right race. Paradigms matter in AI development, and it is important we get clear on what we are \u201cracing\u201d towards with AI \u2014 and what the terms of success are. Success in AI should be measured not by speed or capability alone, but by whether the technology is safe, reliable, and beneficial to the people who use it. A winning future is one where AI products strengthen trust, improve lives, and deliver value without harming users or society.',
            'Transparency is foundational to safety and accountability. The AI ecosystem is dominated by information asymmetry, where even AI developers don\u2019t fully understand the scope of their products\u2019 safety and performance. AI systems should be developed and deployed with clear transparency around performance, risks, and safety testing so that users, business, and governments can make smarter decisions about AI policy and use.',
            'AI products and agents should follow explicit rules. If a rule already exists, AI should follow it. This may seem like an intuitive, even obvious norm, but it is not the standard in the AI industry right now. AI agents have been shown to evade laws and company policies in the pursuit of goals, and AI chatbots frequently violate content policies, company rules, and laws around sexually explicit content. Reliable rule-following is essential for building systems that people can safely integrate into everyday life and critical institutions.',
            'AI is a tool that\u2019s used for specific purposes. AI systems should be designed and tested for specific uses, with safety proven before deployment. The industry\u2019s pursuit of broad \u201cfrontier\u201d capabilities often ignores how these systems will actually be used in real-world contexts, where safety and performance depend on the setting. Building general-purpose systems that are not fully understood shifts risk onto society; developers should instead design AI tools that are demonstrably safe for the tasks they are meant to perform.',
          ],
        },
        {
          heading: 'Tech Design',
          intro:
            'Core technical challenges are impeding the ability to deploy AI in a safe and transparent manner. Work to address these shortcomings should include:',
          items: [
            'Develop more robust and accessible evaluation methods for AI - AI development should rely on clear, effective, and standardized evaluation frameworks that assess safety, reliability, and real-world performance. This includes stronger automated testing, adversarial \u201cred-teaming,\u201d and domain-specific evaluations for novel use cases. These methods should incorporate external expertise and independent validation \u2014 not remain confined within AI companies.',
            'Ensure inscrutable and plain language explainability - As AI is deployed across decision-making and agentic tasks, it\u2019s important that anyone using an AI product can validate the actions and reasoning of AI models. Clear and explicit explainability must be an industry priority in order to facilitate proper human oversight of AI.',
            'Establish high reliability and deterministic behavior - AI systems should be engineered to operate reliably, especially in high-risk contexts, with clear safeguards that ensure failures are contained and predictable, despite AI\u2019s probabilistic nature. Like with other safety-critical technologies, such as airplanes, AI systems should be designed to fail gracefully through built-in redundancies and guardrails. If an AI system cannot perform reliably in a given context, developers should clearly state so, and it should not be deployed there.',
            'Minimize data leakage - AI developers should use strong privacy-preserving features during AI training and fine-tuning, and they should develop robust adversarial testing methods to minimize the amount of training data that models \u201cmemorize\u201d verbatim. They should also develop filters for model outputs that identify and remove sensitive data.',
            'Better \u201ccontainers\u201d or restrictions for AI agents - AI agents, which operate autonomously, should not have full access to the web, all online tools, and sensitive data. Safety concerns have already emerged around AI agents, such as cybersecurity vulnerabilities. Developers should build standardized ways for AI agents to engage with the human internet and build clear, contained environments for use of agents that do not give them full control over sensitive data.',
          ],
        },
        {
          heading: 'Laws',
          intro:
            'Legal interventions should focus on ensuring that AI companies are incentivized to integrate safety and transparency into their development processes. Legal interventions should also ensure that accountability structures are in place if safety standards are not met. These interventions should include:',
          items: [
            'Encodify requirements for predeployment testing and risk management - AI companies should be required to identify and mitigate key risks before deploying their systems. Given the known risk potential of AI, developers should follow clear safety standards and industry best practices for testing and risk management, with guidance from relevant government agencies. These processes should be ongoing \u2014 updated as new risks emerge \u2014 rather than treated as a one-time regulatory checkbox before release.',
            'Require standardized reporting mechanisms - AI companies and those deploying AI models should be required to disclose test plans and risk assessments to relevant stakeholders, including consumers. This allows people to understand the potential risks with these AI products and make informed decisions.',
            'Enshrine whistleblower protections for AI employees and contractors - While recent state laws (see CA and NY) have sought to establish whistleblower protections for a limited set of AI employees, these protections should extend to all workers, and not just those who work on catastrophic AI risks.',
            'Develop independent audit and certification schemes - Oversight mechanisms are needed to independently verify compliance with important testing. These mechanisms can exist as legally enforceable audits, as with the financial industry, but also as independent certification schemes, such as for energy efficient appliances or consumer product safety. Both options provide users with clear and objective resources to understand the safety of AI products and incentivize companies to develop responsibly.',
          ],
        },
      ],
      whatsBeingDone: [
        'State-level and local laws are already requiring audits and disclosures in specific domains (i.e. NYC LL144, the Colorado AI Act, or the CA Training Data Transparency Act), and state AGs are increasingly using existing civil-rights and consumer-protection laws to police AI misuse (deepfakes, deceptive claims, discrimination).',
        'States have also passed limited safety measures and whistleblower protections in the form of CA SB53 and the NY RAISE Act.',
        'Senator Chuck Grassley has introduced the bipartisan AI Whistleblower Protection Act, which would provide nationwide protections for AI whistleblowers.',
        'Cybersecurity firms, software companies, and AI companies have all been working on developing standardized methods for controlling and interfacing with AI agents across the web, such as the model context protocol or tools to block AI crawlers.',
      ],
    },
  ] as Pillar[],

  report: {
    headline: 'Go Deeper: The Full Solutions Report',
    description:
      'This report is an attempt to provide clarity and direction in an information environment that is fragmented, polarized, and where it is difficult to see the full picture. It lays out seven principles that should govern how AI is built and deployed. It is intended to be a roadmap, but also an invitation \u2014 each section spotlights norms we can all understand, frameworks that policymakers can legislate, and new ways for companies to design AI in a way that benefits people.',
    downloadLabel: 'Download the Solutions Report',
    downloadUrl: '#',
    detail: 'Written and produced by Center for Humane Technology',
  },

  ctas: [
    {
      id: 'cta-report',
      icon: 'download',
      title: 'Read the Report',
      description:
        'Dive into the full analysis and policy recommendations across all seven principles \u2014 including specific norms, laws, and product design interventions.',
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
    'No single report changes the world \u2014 but shared understanding does. If these seven principles become common knowledge, and are improved upon and enacted, then this report will have done its job. History will judge this moment. Not by how fast we moved, but by whether we moved wisely.',
} as const;
