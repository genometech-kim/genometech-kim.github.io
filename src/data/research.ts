/**
 * Research 페이지 아티클 데이터.
 * 아티클을 추가/수정/삭제하려면 이 배열만 수정하면 됩니다.
 * @slug URL(/research/{slug})과 이미지 파일명 식별자로 사용. 영문/숫자/하이픈 권장
 * @title 아티클 제목 (목록/상세 상단에 표시)
 * @date 게시일. 형식: YYYY.MM.DD (예: 2026.07.29)
 * @blocks 헤딩-이미지-텍스트 단위 블록 배열. 하나의 아티클에 여러 블록 가능
 *
 * ResearchBlock:
 * @heading 블록 소제목
 * @image 이미지 경로. 지정하지 않으면 public/research/{slug}-{블록 순서}.{jpg|jpeg|png|webp} 를 순서대로 찾아서 사용
 *   (예: slug가 'crispr-2026'이고 첫 번째 블록이면 public/research/crispr-2026-1.jpg, .jpeg, .png, .webp 순으로 탐색).
 *   전부 없으면 이미지 없이 표시됨. 파일명을 규칙과 다르게 쓰고 싶을 때만 직접 지정.
 * @text 본문. 빈 줄(\n\n)로 문단 구분. 강조 표시:
 *   - 볼드: **텍스트**
 *   - 색상: {{red:텍스트}} (색상 이름은 CSS color 키워드 사용, 예: red, blue)
 *   - 색상과 볼드체는 중첩 가능: {{red:**텍스트**}} 또는 **{{red:텍스트}}**
 */
export interface ResearchBlock {
  heading: string;
  image?: string;
  text: string;
}

export interface ResearchArticle {
  slug: string;
  title: string;
  date: string;
  blocks: ResearchBlock[];
}

export const research: ResearchArticle[] = [
  {
    slug: 'bio-big-data-analysis',
    title: 'Bioinformatic Analysis of Unprecedented Bio-Big Data',
    date: '2024.04.10',
    blocks: [
      {
        heading: 'Unraveling Genome Mysteries through Analysis of Unprecedented Bio-Big Data',
        text: "With the array of genome technologies we're developing, we're poised to generate vast amounts of bio-big data previously unattainable. Through thorough analysis of these datasets, our aim is to unravel numerous genome mysteries. These encompass inquiries such as understanding the function of every human genetic mutation and elucidating why individuals manifest varying symptoms from similar genetic diseases. Additionally, we seek to explore personalized therapeutic interventions tailored to individual genetic profiles.",
      },
      {
        heading: 'Generating comprehensive biodata with multi-omic single-cell CRISPR screen',
        text: "Leveraging our {{red:**genome technologies**}}, including {{red:**genome engineering**}} and {{red:**sequencing**}}, we will generate {{red:**comprehensive bio big data**}} and analyze them accordingly to unravel genetic mysteries. We will introduce various types of genetic perturbations and analyze their results using diverse sequencing technologies. The resulting high-quality biodata will empower us to decode the genome's mysteries and pioneer {{red:**efficient personalized medicines**}}.",
      },
    ],
  },
  {
    slug: 'sequencing-technologies',
    title: 'Develop New Sequencing Technologies (Single-cell, Long-read, etc.)',
    date: '2024.04.10',
    blocks: [
      {
        heading: 'Develop New Sequencing Technologies',
        text: 'We specialize in pioneering new sequencing technologies based on various next-generation sequencing methods. This encompasses short-read sequencing such as {{red:**Illumina**}}, long-read sequencing like {{red:**Oxford Nanopore**}} and {{red:**PacBio**}}, as well as single-cell-based technologies including {{red:**10x Genomics**}}. Our objective is to delve into genome analysis with enhanced depth, accuracy, accessibility, and comprehensiveness. Moreover, we integrate these sequencing advancements with genome engineering technologies to elucidate the dynamics of cellular state alterations.',
      },
      {
        heading: 'Single-cell sequencing',
        text: 'Single-cell sequencing is a cutting-edge technique that allows researchers to analyze the genetic information of individual cells within a heterogeneous population. Unlike traditional bulk sequencing methods, which provide an average of the genetic material from a large group of cells, single-cell sequencing enables the study of cellular diversity and heterogeneity at a granular level. Combined with CRISPR screening, referred to as "{{red:**Single-cell CRISPR screen**}}", we can analyze the heterogeneity between differentially engineered cells.',
      },
      {
        heading: 'Long-read sequencing',
        text: 'Long-read sequencing stands as a groundbreaking advancement in genomic technology. By producing reads spanning up to {{red:**millions of base pairs**}}, it surpasses the limitations of traditional short-read sequencing methods. This enables direct measurement of {{red:**single-cell level genotype**}} and {{red:**transcript isoform**}} which was not possible with short-read sequencing. We leverage long-read sequencing to push the boundaries of genomic exploration and innovation.',
      },
    ],
  },
  {
    slug: 'genome-engineering-technologies',
    title: 'Develop Genome Engineering Technologies',
    date: '2024.04.10',
    blocks: [
      {
        heading: 'Develop Genome Engineering Technologies',
        text: "We develop a range of genome engineering technologies, notably {{red:**CRISPR**}}, aimed at addressing the question of '{{red:**How to write genome**}}'. Our focus lies in enhancing the {{red:**versatility, precision, efficiency, and scalability of genome engineering tools**}}. Through our efforts, we aim to establish a comprehensive engineering toolbox capable of generating desired cellular constructs with unprecedented control and efficiency.",
      },
      {
        heading: 'Enhancing genome engineering tool',
        text: 'We enhance the versatility, precision, efficiency, and scalability of genome engineering tools by fine-tuning each component, verified through various NGS-based analysis tools.',
      },
      {
        heading: 'Utilizing genome engineering tools (CRISPR screens)',
        text: 'Not limited to single gene/mutation editing, we specialize in {{red:massively-parallel high-throughput genome engineerings}}. Our expertise extends beyond gene knockout to include SNP, epigenetic modification, and structural variation. By introducing multiple genome engineerings to numerous cells and analyzing them, we gain {{red:insights into the effects of more than hundreds of genetic modifications simultaneously}}.',
      },
    ],
  },
  {
    slug: 'develop-genome-technologies',
    title: 'Develop various Genome Technologies to reveal genetic mysteries.',
    date: '2024.03.19',
    blocks: [
      {
        heading: 'Develop various Genome Technologies to reveal genetic mysteries.',
        text: "By harnessing cutting-edge genome technologies such as {{red:CRISPR}}, {{red:single-cell sequencing}}, {{red:long-read sequencing}}, and {{red:bioinformatics}}, our laboratory is dedicated to unveiling the hidden secrets within the human genome. We are actively developing genome technologies to enhance our ability to {{red:write}}, {{red:read}}, {{red:and analyze genetic information with unprecedented precision and efficiency}}. With these powerful methods in our toolkit, we possess the capability to both '{{red:WRITE}}' and '{{red:READ}}' the genome.",
      },
    ],
  },
];
