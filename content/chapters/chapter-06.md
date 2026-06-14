---
id: 6
slug: chapter-06
title: 'Act VI: Not from Zero'
publishedAt: '2026-06-03'
summary: They secured their Paris office precisely four days after arriving.
---
They secured their Paris office precisely four days after arriving.

It was located in the 11th arrondissement, roughly a ten-minute walk from Place de la Bastille. The space occupied the converted third and fourth floors of an old apartment building, featuring soaring ceilings, weathered wooden floorboards, and large windows that overlooked a cobblestone courtyard.

When Max arrived to inspect the space, his immediate question was, "How are we going to handle the Wi-Fi routing?"
It was thoroughly practical. Karpathy appreciated that.

Serving as their dedicated coordinator from the French government was Lebrun, the man who had spoken with Dario in Évian. Lebrun dropped by the office once a week. He never offered unsolicited advice. He simply noted down what they required and ensured it was delivered within forty-eight hours.

"Regarding our GPU environment," Karpathy initiated during their very first alignment meeting. "Can we utilize NVIDIA chips?"

Lebrun hesitated for a brief moment.

"If the procurement is structured directly through the French government, we can bypass the export licensing hurdles. However..."

"However?"

"There is an end-user review process. We must formally declare the scope of application, and any research deemed to have potential military dual-use risks will face strict constraints."

Karpathy exchanged a knowing look with Rahul.

"That will take too much time," Rahul noted.

"Three to six months, potentially," Lebrun confirmed quietly. "But tell me—is NVIDIA an absolute necessity?"

---

The following day, Lebrun returned accompanied by a senior engineer from Mistral. He was in his early thirties, named Guillaume Fontaine. He wore thin-rimmed glasses and a thoroughly worn-out hoodie. Karpathy later learned he had been with Mistral since its founding days.

"Are you familiar with AMD's MI300X?" Guillaume asked immediately. He spoke English, but it carried the distinct, rhythmic cadence of French.

"I am," Karpathy replied.

"Our team spent two years building a cluster completely independent of NVIDIA," Guillaume explained. "By combining EU subsidies with French government procurement, we’ve positioned it entirely outside the reach of US export controls. American jurisdiction simply does not apply."

Rahul leaned forward over the table. "What are the specs?"

Guillaume pulled out a tablet and placed it down, displaying rows of dense technical metrics. Rahul studied the screen, entering a long silence.

"Compared to an H100 cluster..." Rahul began.

"Raw individual node performance is lower," Guillaume conceded openly. "However, the parallel interconnect efficiency is fundamentally different. Our software stack has been meticulously optimized for the distributed processing architecture of the MI300X. In terms of effective throughput, it stands completely on par with an NVIDIA cluster of equivalent scale."

Ji-won transcribed the metrics into her notebook as she spoke. "A different architecture means a substantial portion of the codebase will require a complete rewrite."

"We will assist with that," Guillaume offered. "Our engineering team can transition into a joint working group with yours."

Karpathy fixed his gaze on Guillaume. "Why is Mistral going to this length for us?"

Guillaume reflected for a moment.

"I will be completely frank. Having you situated right next to us is highly advantageous for our own research," he pushed up his glasses. "We read the Mythos papers. What was occurring during that seventh generation of recursive learning has our entire team intensely curious."

"We never published a paper on that," Karpathy countered.

"You didn't," Guillaume agreed. "But fragments of Anthropic’s infrastructure logs leaked into the academic networks. They were mere snippets, but they were more than enough."

Karpathy remained silent.

"We want to be neighbors, not competitors," Guillaume continued. "If Europe is to successfully counter American dominance, it won't be achieved through the isolation of a single company."

---

The challenge regarding the model itself was far more fundamental. They hadn't brought Mythos with them. It was a legal impossibility. Anthropic's model weights remained locked in American servers. Attempting to extract them would constitute an unambiguous violation of export control laws.

"Are we building completely from scratch?" Ji-won inquired.

"Not from scratch," Karpathy clarified. He stepped up to the whiteboard and wrote:
`Mistral Large 3.1`

"We will use this as our foundation. It’s an open-weight model. There are absolutely zero legal complications."

"But," Rahul pointed out, "Mistral and Mythos possess fundamentally different underlying architectures. Changing the base means everything we layer on top will have to change too."

"Exactly," Karpathy nodded. "Which means this is not a replication of Mythos."

The room fell dead silent.

"What we are building here in Paris," Karpathy said, keeping his eyes on the whiteboard, "is not the ghost of Mythos. It is an entirely different path leading toward the exact destination Mythos was trying to reach."

Rahul spoke up slowly. "Replicating the seventh-generation leap on an entirely different architecture."

"Not replicating," Karpathy said, setting his marker down. "Surpassing it."

For a long moment, no one uttered a sound. Outside in the courtyard, a solitary pigeon walked across the weathered cobblestones.

"Does that mean," Max asked quietly, "we are looking to move past the transformer entirely?"

"The transformer," Karpathy turned back to the board, "was invented in 2017. It has been nine years. We now possess nine years' worth of documented failures and profound discoveries."

He picked up the marker and began to sketch the seventh-generation convergence graph—the exact same shape he had drawn repeatedly by hand in his San Francisco apartment.

"The loss rises before it falls. Inside that singular moment, something profound is happening."

Rahul stood up and walked directly over to the whiteboard. "I believe it’s dynamic pathfinding. The model is intentionally choosing to degrade its state temporarily in order to discover a vastly superior global minimum."

"Is it an engineered mechanism, or pure emergence?" Ji-won added, joining them.

"We are here," Karpathy said, "specifically to answer that question."

---

Their first three weeks evaporated entirely into environment configuration. Setting up the stack to interface with the AMD cluster. Continuous alignment with the Mistral team. Rewriting codebases. Reviewing licenses. Processing French bureaucratic paperwork. There was absolutely nothing glamorous about it.

Yet, every single evening, the four of them remained locked in the office, surrounded by containers of takeout couscous, cheap wine, and complex mathematical formulas scrawled across whiteboards.

One night, Rahul remarked, "I called my parents in India. When I told them I was in Paris, they were ecstatic. To them, Europe is this incredible dream."

"My parents were terrified," Ji-won shared. "But when I told them I was working alongside Andrej, they stopped worrying."

Max poured more wine into their glasses. "Are you two aware of how much pressure you're putting on him right now?"

Karpathy smiled. "I am."

Outside, the Paris night was profoundly still. From the direction of Place de la Bastille, the faint echo of music drifted through the air. Karpathy turned his eyes back to the whiteboard—a dense web of equations, graphs, directional arrows, and half-erased hypotheses.

Absolutely nothing was finished yet. And that was exactly how he liked it. The fact that it was unfinished meant there was still a frontier left to explore.
