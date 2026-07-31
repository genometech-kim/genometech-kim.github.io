/**
 * Publication 페이지 논문 데이터.
 * 논문을 추가/수정/삭제하려면 이 배열만 수정하면 됩니다.
 * 목록은 배열 순서 그대로 표시되며, 번호는 배열 첫 항목이 가장 큰 번호가 되도록 내림차순으로 매겨집니다.
 * (즉, 최신 논문을 배열 맨 앞에 추가하세요.)
 *
 * @title 논문 제목
 * @journal 저널명
 * @year 출간연도
 * @authors 저자 목록 문자열. 원문 그대로 붙여넣으면 됨(쉼표 구분 불필요).
 *   BOLD_AUTHORS에 있는 이름이 문자열 안에 포함되어 있으면 해당 부분만 볼드로 표시됨
 * @url 논문 원문/DOI 링크. 링크 버튼 클릭 시 새 탭으로 열림
 */
export interface Publication {
  title: string;
  journal: string;
  year: number;
  authors: string;
  url: string;
}

/**
 * authors 문자열 안에서 볼드로 강조할 이름 화이트리스트.
 * 문자열에 이 값이 포함(substring match)되어 있으면 그 부분만 볼드 처리됨.
 */
export const BOLD_AUTHORS: string[] = ['Kim, H.', 'Kim, H. S.', 'Kim H. S.'];

// 기존 사이트(crispr.hanyang.ac.kr) Publication 게시판에서 그대로 옮긴 데이터.
// 원본 사이트 자체의 오타/오류(저널명 오타 등)를 그대로 보존했습니다.
export const publications: Publication[] = [
  {
    title: 'Single cell and spatial alternative splicing analysis with Nanopore long read sequencing.',
    journal: 'Nature Communications',
    year: 2025,
    authors: 'Fu, Y., Kim, H., Roy, S., Huang, S., Adams, J. I., Grimes, S. M., Lau, B. T., Sathe, A., Ji, H. P., & Zhang, N. R.',
    url: 'https://www.nature.com/articles/s41467-025-60902-2',
  },
  {
    title: 'Combining Multiplexed CRISPR/Cas9-Nickase and PARP Inhibitors Efficiently and Precisely Targets Cancer Cells',
    journal: 'Cancer Research',
    year: 2025,
    authors: 'Lee, S., Kim, K., Jeong, H. J., Choi, S., Cheng, H., Kim, D., Heo, S., Mun, J., Kim, M., Lee, E., Choi, Y. J., Lee, S. G., Lee, E. A., Jang, Y., Lim, K., Kim, H. S., Jeong, E., Myung, S. J., Jung, D. B.,…Cho, S. W.',
    url: 'https://aacrjournals.org/cancerres/article/85/15/2890/763874/Combining-Multiplexed-CRISPR-Cas9-Nickase-and-PARP',
  },
  {
    title: 'Large DNA deletions occur during DNA repair at 20-fold lower frequency for base editors and prime editors than for Cas9 nucleases',
    journal: 'Nature biomedical engineerning',
    year: 2024,
    authors: 'Hwang G. H., Lee S. H., Oh M., Kim S., Habib O., Jang H. K., Kim H. S., Kim Y., Kim C. H., Kim S., & Bae S.',
    url: 'https://www.nature.com/articles/s41551-024-01277-5',
  },
  {
    title: 'Recent advances in CRISPR-based functional genomics for the study of disease-associated genetic variants',
    journal: 'Experimental & Molecular Medicine',
    year: 2024,
    authors: 'Kim H. S., Kweon J., Kim Y.',
    url: 'https://www.nature.com/articles/s12276-024-01212-3',
  },
  {
    title: 'Direct measurement of engineered cancer mutations and their transcriptional phenotypes in single cells.',
    journal: 'Nature Biotechnology',
    year: 2023,
    authors: 'Kim H. S., Grimes, S. M., Chen, T., Sathe, A., Lau, B., Hwang, G.-H., Bae, S., Ji, H. P.',
    url: 'https://www.nature.com/articles/s41587-023-01949-8',
  },
  {
    title: 'Single-cell multi-gene identification of somatic mutations and gene rearrangements in cancer.',
    journal: 'NAR Cancer',
    year: 2023,
    authors: 'Grimes, S.M., Kim H. S., Roy, S., Sathe, A., Ayala, C.I., Bai, X., Almeda-Notestine, A.F., Haebe, S., Shree, T., Levy, R., Lau, B., Ji, H. P.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/37435532/',
  },
  {
    title: 'A SLC35C2 Transporter-Targeting Fluorescent Probe for the Selective Detection of B Lymphocytes Identified by SLC-CRISPRi and Unbiased Fluorescence Library Screening.',
    journal: 'Angewandte Chemie',
    year: 2022,
    authors: 'Gao, M., Lee, S. H., Das, R. K., Kwon, H. Y., Kim H. S., Chang, Y. T.',
    url: 'https://onlinelibrary.wiley.com/doi/10.1002/anie.202202095',
  },
  {
    title: 'ABCB1 Can Actively Pump-out the Background-Free Tame Fluorescent Probe CO-1 From Live Cells.',
    journal: 'CHENISTRY OF ASIAN JOURNAL',
    year: 2022,
    authors: 'Miasiro Ciaramicoli, L., Kim H. S., Husen Alamudi, S., Chang, Y. T.',
    url: 'https://onlinelibrary.wiley.com/doi/10.1002/asia.202200229',
  },
  {
    title: 'New approaches to moderate CRISPR-Cas9 activity: Addressing issues of cellular uptake and endosomal escape.',
    journal: 'Molecular Therapy',
    year: 2022,
    authors: 'van Hees, M., Slott, S., Hansen, A. H., Kim H. S., Ji, H. P., Astakhova, K.',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8753288/',
  },
  {
    title: 'Single cell characterization of CRISPR-modified transcript isoforms with nanopore sequencing.',
    journal: 'Genome Biology',
    year: 2021,
    authors: 'Kim H. S., Grimes, S. M., Hooker, A. C., Lau, B., Ji, H. P.',
    url: 'https://genomebiology.biomedcentral.com/articles/10.1186/s13059-021-02554-1',
  },
  {
    title: 'IIntegrative single-cell analysis of allele-specific copy number alterations and chromatin accessibility in cancer.',
    journal: 'Nature Biotechnology',
    year: 2021,
    authors: 'Wu, C.-Y., Kim H. S., Lau, B., Sathe, A., Grimes, S. M., Ji, H. P., Zhang, N.',
    url: 'https://www.nature.com/articles/s41587-021-00911-w',
  },
  {
    title: 'A Crucial Role of ACBD3 Required for Coxsackievirus Infection in Animal Model Developed by AAV-Mediated CRISPR Genome Editing Technique.',
    journal: 'Viruses',
    year: 2021,
    authors: 'Shin, H. J., Ku, K. B., Kim, S., Kim H. S., Kim, Y.-S., Kim, B.-T., Kim, S.-J., and Kim, C.',
    url: 'https://www.mdpi.com/1999-4915/13/2/237',
  },
  {
    title: 'Small-molecule inhibitors of histone deacetylase improve CRISPR-based adenine base editing.',
    journal: 'Nucleic Acids Research',
    year: 2021,
    authors: 'Shin, H. R., See, J.-E., Kweon, J., Kim H. S., Sung, G.-J., Park, S., Jang, A.-H., Jang, G., Choi, K.-C., Kim, I., Kim, J.-S., Kim, Y.',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7913676/',
  },
  {
    title: 'Target identification of mouse stem cell probe CDy1 as ALDH2 and Abcb1b through live-cell affinity-matrix and ABC CRISPRa library.',
    journal: 'RSC Chemical Biology',
    year: 2021,
    authors: 'Miyamoto, N., Go, Y. H., Ciaramicoli, L. M., Kwon, H. Y., Bi, Kim H. S., X., Yu, Y. H., Kim, B., Ha, H. H., Kang, N. Y., Yun, S. W., Kim, J. -S., Cha, H. J., Chang, Y. T.',
    url: 'https://pubs.rsc.org/en/content/articlelanding/2021/cb/d1cb00147g',
  },
  {
    title: 'CReVIS-Seq: A highly accurate and multiplexable method for genome-wide mapping of lentiviral integration sites.',
    journal: 'Molecular Therapy Methods & Clinicial Development',
    year: 2021,
    authors: 'Kim H. S., Hwang, G.-H., Lee, H. K., Bae, T., Park, S.-H., Kim, Y. J., Lee, S., Park, J.-H., Bae, S., and Hur, J. K.',
    url: 'https://www.cell.com/molecular-therapy-family/methods/fulltext/S2329-0501(20)30216-3?_returnURL=https%3A%2F%2Flinkinghub.elsevier.com%2Fretrieve%2Fpii%2FS2329050120302163%3Fshowall%3Dtrue',
  },
  {
    title: 'CRISPR-sub: Analysis of DNA substitution mutations caused by CRISPR-Cas9 in human cells.',
    journal: 'COMPUTATIONAL AND STRUCTURAL BIOTECHNOLOGY',
    year: 2020,
    authors: 'Hwang, G.-H., Yu, J., Yang, S., Son, W. J., Lim, K., Kim H. S., Kim, J.-S., Bae, S.',
    url: 'https://www.sciencedirect.com/science/article/pii/S2001037020303159',
  },
  {
    title: 'Adenine base editors catalyze cytosine conversions in human cells.',
    journal: 'Nature Biotechnology',
    year: 2019,
    authors: 'Kim H. S., Jeong, Y. K., Hur, J. K., Kim, J.-S., and Bae, S.',
    url: 'https://www.nature.com/articles/s41587-019-0254-4',
  },
  {
    title: 'Imaging inflammation using an activated macrophage probe with Slc18b1 as the activation-selective gating target.',
    journal: 'Nature Communications',
    year: 2019,
    authors: 'Park, S.-J., Kim, B., Choi, S., Balasubramaniam, S., Lee, Kim H. S., S.-C., Lee, J. Y., Kim, J.-Y., Kim, J.-J., Lee, Y.-A., Kang, N.-Y., Kim, J.-S., Chang, Y.-T.',
    url: 'https://www.nature.com/articles/s41467-019-08990-9',
  },
  {
    title: 'Arrayed CRISPR screen with image-based assay reliably uncovers host genes required for coxsackievirus infection.',
    journal: 'GENOME RESEARCH',
    year: 2018,
    authors: 'Kim H. S., Lee, K., Kim, S. J., Cho, S., Shin, H. J., Kim, C., Kim, J.-S.',
    url: 'https://genome.cshlp.org/content/28/6/859.long',
  },
  {
    title: 'Adenine base editing in mouse embryos and an adult mouse model of Duchenne muscular dystrophy.',
    journal: 'Nature Biotechnology',
    year: 2018,
    authors: 'Ryu, S. M., Koo, T., Kim, K., Lim, K., Baek, G., Kim, S.T.,Kim, Kim H. S., D. E., Lee, H., Chung, E., Kim, J.-S.',
    url: 'https://www.nature.com/articles/nbt.4148',
  },
  {
    title: 'CRISPR/Cas9-mediated gene knockout screens and target identification via whole-genome sequencing uncover host genes required for picornavirus infection.',
    journal: 'JOURNAL OF BIOLOGICAL CHEMISTRY',
    year: 2017,
    authors: 'Kim H. S., Lee, K., Bae, S., Park, J., Lee, C. K., Kim, M., Kim, E., Kim, M., Kim, S., Kim, C., Kim, J.-S.',
    url: 'https://www.sciencedirect.com/science/article/pii/S0021925820396034',
  },
  {
    title: 'CUT-PCR: CRISPR-mediated, ultrasensitive detection of target DNA using PCR.',
    journal: 'Oncogene',
    year: 2017,
    authors: 'Lee, S., Yu, J., Hwang, G. H., Kim, S., Kim H. S., Ye, S., Kim, K., Park, J., Park, D. Y., Cho, Y.-K., Kim, J.-S., Bae, S.',
    url: 'https://www.nature.com/articles/onc2017281',
  },
  {
    title: 'Microhomology-based choice of Cas9 nuclease target sites.',
    journal: 'Nature methods',
    year: 2014,
    authors: 'Bae, S., Kweon, J., Kim H. S., Kim, J.-S.',
    url: 'https://www.nature.com/articles/nmeth.3015',
  },
  {
    title: 'Analysis of off-target effects of CRISPR/Cas-derived RNA-guided endonucleases and nickases.',
    journal: 'GENOME RESEARCH',
    year: 2013,
    authors: 'Cho, S. W., Kim, S., Kim, Y., Kweon, J., Kim H. S., Bae, S., Kim, J.-S.',
    url: 'https://genome.cshlp.org/content/24/1/132.long',
  },
];
