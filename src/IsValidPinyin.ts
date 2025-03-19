type Options = {
  allowUnused?: boolean;
  include?: string[];
  exclude?: string[];
};

/**
 * A set of valid pinyin syllables.
 *
 * Data sources (as of 18/3/2025):
 * - https://files.hwxnet.com/tools/html/pinyin.html
 *
 * Notes:
 * - All pinyin included in `validPinyin` were verified against https://zd.hwxnet.com.
 * - This set includes standard pinyin spellings but excludes non-standard or erroneous variations.
 * - Special cases: "lv", "nv", "lve", and "nve" are included as valid forms of "lü", "nü", "lüe", and "nüe" respectively.
 * - Examples of excluded non-standard pinyin: "biang" (https://en.wiktionary.org/wiki/%F0%B0%BB%9D)
 */
const validPinyin: Set<string> = new Set(
  `ba      bo      bai     bei     bao     ban     ben     bang    beng    bi      bie     biao    bian    bin     bing    bu      pa      po      pai     pei     pao     pou     pan     pen     pang    peng    pi      pie     piao    pian
 pin     ping    pu      ma      mo      mai     mei     mao     mou     man     men     mang    meng    mi      mie     miao    miu     mian    min     ming    mu      fa      fo      me      fei     fou     fan     fen     fang    feng    
 fu      da      de      dai     dei     dao     dou     dan     den     dang    deng    dong    di      dia     die     diao    diu     dian    ding    du      duo     dui     duan    dun     ta      te      tai     tei     tao     tou     
 tan     tang    teng    tong    ti      tie     tiao    tian    ting    tu      tuo     tui     tuan    tun     na      ne      nai     nei     nao     nou     nan     nen     nang    neng    nong    ni      nie     niao    niu     nian    
 nin     niang   ning    nu      nuo     nuan    nü      nv      nüe     nve     la      le      lai     lei     lao     lou     lan     lang    leng    long    li      lia     lie     liao    liu     lian    lin     liang   ling    lu      
 luo     luan    lun     lü      lv      lüe     lve     ga      ge      gai     gei     gao     gou     gan     gen     gang    geng    gong    gu      gua     guo     guai    gui     guan    gun     guang   ka      ke      kai     kao     
 kou     kan     ken     kang    keng    kong    ku      kua     kuo     kuai    kui     kuan    kun     kuang   ha      he      hai     hei     hao     hou     han     hen     hang    heng    hong    hu      hua     huo     huai    hui     
 huan    hun     huang   ji      jia     jie     jiao    jiu     jian    jin     jiang   jing    jiong   ju      jue     juan    jun     qi      qia     qie     qiao    qiu     qian    qin     qiang   qing    qiong   qu      que     quan    
 qun     xi      xia     xie     xiao    xiu     xian    xin     xiang   xing    xiong   xu      xue     xuan    xun     zha     zhe     zhi     zhai    zhei    zhao    zhou    zhan    zhen    zhang   zheng   zhong   zhu     zhua    zhuo    
 zhuai   zhui    zhuan   zhun    zhuang  cha     che     chi     chai    chao    chou    chan    chen    chang   cheng   chong   chu     chuo    chuai   chui    chuan   chun    chuang  sha     she     shi     shai    shei    shao    shou    
 shan    shen    shang   sheng   shu     shua    shuo    shuai   shui    shuan   shun    shuang  re      ri      rao     rou     ran     ren     rang    reng    rong    ru      ruo     rui     ruan    run     za      ze      zi      zai     
 zei     zao     zou     zan     zen     zang    zeng    zong    zu      zuo     zui     zuan    zun     ca      ce      ci      cai     cao     cou     can     cen     cang    ceng    cong    cu      cuo     cui     cuan    cun     sa      
 se      si      sai     sao     sou     san     sen     sang    seng    song    su      suo     sui     suan    sun     a       o       e       er      ai      ei      ao      ou      an      en      ang     eng     yi      ya      ye      
 yao     you     yan     yin     yang    ying    yong    wu      wa      wo      wai     wei     wan     wen     wang    weng    yu      yue     yuan    yun     

 bāo     běi     bò      bǎi     bēn     bāi     bó      báo     bǒ      bō      bā      bèi     bàn     bān     bào     bǎo     bāng    bèn     bēi     bǎn     bái     bá      bà      bǎ      bài     běn     bèng    biè     bǐng    bì      
 bīn     biǎn    bīng    bǐ      bìn     bí      biào    bǎng    bàng    béng    bēng    biān    bié     biàn    biě     biāo    biē     bìng    bū      bú      bǔ      pà      pò      pá      pā      pō      bù      pó      pāi     pǒ      
 pǎi     pěi     pài     pēi     péi     pǎo     pāo     pèi     pào     páo     pōu     bī      pǒu     pān     pán     pāng    pěn     pǎng    pèn     pēn     pén     pàn     páng    pǎn     biǎo    pàng    pī      pěng    pēng    péng    
 pèng    piē     pí      pǐ      pì      piě     póu     piǎo    piāo    piào    piáo    piān    piàn    pīng    pín     pián    piǎn    pǐn     pìn     píng    pǐng    pū      mà      mǎ      pù      má      pú      mā      mō      pǔ      
 mó      mǒ      mò      mái     mǎi     mài     méi     měi     mōu     mèi     māo     mào     mǎo     máo     móu     mǒu     mān     mán     měn     mèn     mén     mēn     mǎn     máng    mǎng    měng    mēng    méng    mèng    mī      
 mí      mǐ      miè     miāo    miáo    miǎo    miào    miū     miù     mián    miàn    mín     miǎn    míng    mǐng    miē     màn     mú      mǔ      mù      fā      mì      fà      fá      mìng    fó      běng    pīn     féi     fēi     
 fěi     fèi     fóu     fǒu     fān     fán     fǎn     fēn     fén     fěn     fāng    fèn     fēng    fàng    féng    fěng    fèng    fū      dā      dá      fù      dǎ      mǐn     dà      dé      dē      dāi     dǎi     dài     dēi     
 děi     dáo     dǎo     dōu     dào     dǒu     dòu     dǎn     dàn     dān     fú      fǔ      dāng    dǎng    dàng    dēng    děng    dèng    dōng    dǒng    dòng    dī      dǐ      dí      dì      diǎ     diē     dié     diāo    diào    
 diǎo    diū     diān    diǎn    diàn    mòu     dǐng    dīng    dìng    dū      dú      dǔ      dù      dāo     duō     duǒ     fǎ      duī     duò     duì     duān    duǎn    pái     duàn    dūn     tā      dǔn     dùn     tǎ      tà      
 tè      tái     tāi     fáng    tēi     tài     tǎi     táo     tāo     tǎo     tào     tǒu     tòu     tán     tǎn     tān     tàn     tǎng    táng    tāng    tóu     tēng    tàng    téng    tóng    tōng    tì      tī      tiē     tǒng    
 tǐ      tòng    tí      tiě     tiè     tiāo    tiǎo    tiáo    tiào    tiān    tián    tiǎn    tiàn    tīng    tíng    tǐng    tìng    tū      tōu     tú      tǔ      tuō     tù      tuó     tuǒ     tuì     tuí     tuān    tuī     tuǐ     
 tuán    tuàn    tuǎn    tún     tǔn     tùn     nā      nǎ      nà      ná      né      nè      nǎi     nái     náo     něi     nèi     nāo     nǎo     nào     tūn     duó     nòu     nān     nán     nǎn     nóu     nèn     nāng    náng    
 nǎng    nàng    néng    nóng    nèng    nòng    nī      nì      nǐ      ní      niē     nàn     nié     niè     niǎo    niào    niū     niú     niǔ     niān    niù     niǎn    niàn    nín     niáng   niàng   nǐng    nài     fǎng    nū      
 nú      nǔ      nù      nuó     nuǒ     nuò     nuǎn    nián    níng    lā      lá      lǎ      lē      là      lè      lēi     lài     léi     lǎi     lěi     lèi     láo     lāo     lǎo     lào     lóu     lōu     lǒu     lòu     nǐn     
 nuàn    lán     lǎn     làn     lāng    láng    lǎng    làng    lēng    léng    lěng    nēn     lōng    lèng    lǒng    lóng    lòng    fàn     lī      lǐ      lí      lì      liǎ     liē     liě     liè     liāo    liáo    liǎo    liào    
 liú     liū     liǔ     liù     nìng    lián    liǎn    liàn    līn     lín     lǐn     lìn     liǎng   liáng   líng    lǐng    lú      lǔ      lìng    lù      luō     luó     luò     luàn    luán    luǎn    lún     lǔn     lùn     luǒ     
 gǎ      gā      gá      gē      gé      gà      gě      gè      gāi     gǎi     gài     gěi     gāo     lái     gǎo     gào     góu     gǒu     gòu     gǎn     gēn     liàng   gàn     gén     gōu     gèn     gāng    gàng    gǎng    gēng    
 lū      gèng    gōng    gǒng    gòng    gān     gū      gú      gù      guǎ     guā     guà     guó     guō     guǒ     guò     guāi    guǎi    guài    guī     guì     guǐ     guān    guǎn    guàn    gūn     gǔ      gùn     guǎng   gǔn     
 guàng   kā      kē      ké      kà      kě      kè      kāi     kài     tuò     kǎi     kāo     kǎo     kào     kōu     kǒu     kòu     kān     kǎn     kàn     kěn     kāng    kèn     káng    kǎng    kēng    kàng    kōng    kǎ      kǒng    
 kòng    kěng    kǔ      kū      kù      kuā     kuǎ     kuà     guāng   kuǒ     kuāi    kuò     kuǎi    kuài    kuī     kuí     kuǐ     kuì     kuān    kuǎn    kūn     kuāng   kuáng   kùn     kǔn     kuǎng   kuàng   hā      há      hǎ      
 hà      hē      hé      hè      hāi     hǎi     hēi     hài     hāo     háo     hào     hōu     hǒu     hóu     hān     hòu     hán     hǎn     hàn     hěn     hāng    háng    hàng    hēng    héng    hǎo     hèng    hōng    hòng    hū      
 hèn     hǔ      hú      huā     hù      huá     huō     huà     huó     huǒ     huò     hén     huāi    huái    huài    huī     huí     huǐ     huì     huān    huán    huàn    huǎn    hún     hūn     hǔn     hùn     huāng   huáng   huǎng   
 jī      jí      jǐ      jì      jiá     jiā     jiǎ     jià     gěng    jiē     jié     jiě     hóng    jiè     jiāo    jiáo    jiào    jiǎo    jiū     jiù     jiǔ     jiān    jiǎn    hǒng    jiàn    jīn     jìn     jiāng   jiǎng   jīng    
 jǐng    hái     jìng    jiōng   jiàng   jiǒng   jū      jú      jǔ      juē     jù      jué     juě     juè     juān    juǎn    juàn    jūn     jǔn     qī      jùn     qí      qǐ      qì      qiā     qiá     lūn     qiǎ     qié     qià     
 qiē     qiè     qiāo    qiǎo    qiáo    qiào    qiū     qiǔ     qiú     qiān    qián    qiǎn    qiàn    qǐn     qīn     qìn     qín     qiāng   qiáng   qiǎng   qiàng   qīng    qíng    qǐng    qìng    qiōng   qióng   qū      qú      jǐn     
 qǔ      qué     quē     qù      què     quán    qūn     quǎn    qún     quàn    xī      xí      xǐ      xì      gěn     qiě     xià     xiā     xiē     xié     xiě     xiè     xiáo    xiào    xiū     xiǎo    xiǔ     xiān    xiù     xián    
 xīn     xiǎn    xiàn    xín     xǐn     xìn     xiāng   xiáng   xiǎng   huàng   xíng    xiàng   xīng    xǐng    xiōng   xióng   xìng    xiǒng   xiòng   xú      xū      xǔ      xù      xuē     xuě     xué     xuè     xuān    xūn     xún     
 xuǎn    xuàn    xùn     zhā     zhá     zhē     zhǎ     zhà     zhé     zhè     zhí     zhī     zhǐ     zhāi    zhì     zhǎi    zhài    zhèi    zhāo    zhǎo    zháo    quān    zhōu    zhǒu    zhào    zhòu    zhàn    zhān    zhǎn    zhēn    
 zhèn    xiāo    zhāng   zhǎng   zhěng   zhēng   zhàng   zhèng   zhōng   zhòng   zhě     zhái    zhū     zhǔ     xuán    zhù     zhuā    zhǒng   zhuǎ    zhuō    zhuó    zhěn    zhuāi   zhuǎi   zhuài   zhuǐ    zhuī    zhuì    xiá     zhuān   
 zhuàn   zhūn    zhùn    zhǔn    chā     zhuǎng  zhuàng  chá     chǎ     chē     chè     chě     chī     chǐ     chì     chāi    chǎi    chái    chài    cháo    chǎo    chāo    chào    chóu    chōu    chǒu    chān    chǎn    chán    chòu    
 chàn    chén    chēn    zhuāng  chěn    chèn    chāng   zhú     cháng   chǎng   chàng   chéng   chēng   chǒng   chōng   chèng   chěng   chóng   chòng   chū     chú     zhuǎn   chǔ     chù     chuō    chuò    chuái   chuāi   chuài   chuī    
 chuǎi   chuì    chuān   chuǎn   chuán   chuàn   chūn    chún    chǔn    chuáng  chuǎng  shā     shá     shǎ     shé     shē     shě     shè     shī     shí     shǐ     shāi    shì     shǎi    shài    shéi    shāo    chuāng  chà     sháo    
 shǎo    shào    shōu    chuí    chuó    shà     shòu    shǒu    shóu    shān    shǎn    shàn    shēn    shén    shěn    shèn    shāng   chí     shàng   shēng   shéng   shèng   shū     shú     shǔ     shù     shuā    shuǎ    shuà    shuō    
 shuāi   shuǎi   shuò    shuài   shuǐ    shuì    shuān   shuàn   shuí    shǔn    shùn    shuāng  shuǎng  rě      rè      rì      ráo     rǎo     shěng   rào     shǎng   róu     ròu     rǒu     rán     rǎn     rén     rěn     rèn     rāng    
 rǎng    réng    rēng    rèng    róng    ròng    rǒng    zhóu    rú      rù      rǔ      ruò     ruí     ruǐ     ruì     ruán    ruǎn    rún     rùn     zā      rūn     zě      zé      zè      zī      zì      zǎi     zǎ      zài     zéi     
 záo     zāi     shuàng  zǒu     zào     zāo     zòu     zǐ      chuàng  zǎo     zāng    zèn     zān     zàng    zàn     zá      zēng    zèng    zōng    zǎng    zǎn     zōu     zán     zòng    zǒng    zú      ráng    zí      zǔ      zěn     
 zuō     zū      zuǒ     zuò     zuì     zuàn    zuǎn    zǔn     zūn     zùn     cā      cà      cǎ      zuó     cī      zuǐ     cāi     cǐ      cì      zuān    cǎi     cè      cí      cáo     cāo     cái     cài     zuī     còu     cān     
 cǎn     cǎo     cén     cāng    cáng    càn     càng    cán     cào     cōng    cèng    cóng    cū      cú      cuō     cuó     cuǒ     cēn     cēng    cuò     cuī     cuǐ     cuì     cuán    còng    cǔn     cùn     cuān    sā      cuí     
 cù      cuàn    cūn     sà      sè      sī      sǐ      sì      sāi     sē      cún     sài     sāo     sǎo     sào     sōu     sǒu     sān     sòu     sǎn     sēn     sǎ      sāng    sǎng    sàng    sēng    céng    sōng    sǒng    sàn     
 sòng    sū      sú      suō     sù      suǒ     suò     suī     ràng    suí     suǐ     suì     suān    suǎn    suàn    sūn     sǔn     sùn     ā       á       à       ō       ó       ǒ       ò       é       ē       è       èr      ái      
 ài      ǎi      éi      āo      èi      áo      ě       ōu      ǒu      ěr      ēr      án      ǎo      āi      ào      ēn      òu      óu      ēi      ǎn      áng     àng     ān      ēng     yī      àn      yǐ      yí      yì      yā      
 yá      yǎ      yà      yē      èn      yé      yè      yāo     yáo     yǎo     yào     ǎ       yōu     yóu     yòu     yǒu     ér      yān     yǎn     yán     yīn     yàn     yāng    yìn     yáng    yǎng    yīng    yíng    yìng    yǐng    
 yōng    yǐn     yóng    yǒng    wū      yòng    wǔ      wú      wù      ěi      wā      yàng    wá      wǎ      wō      wà      yě      wó      wò      wǒ      wāi     yín     āng     wēi     wài     wéi     wěi     wèi     wān     wǎn     
 wàn     wēn     wén     wěn     wèn     wāng    wáng    ǎng     wǎng    wàng    wēng    wěng    yū      wèng    yú      yǔ      yù      yuē     yuě     yuán    yuè     yuàn    yūn     yún     yǔn     yùn     wǎi     yuǎn    yuān    wán     
 lüě     lüè     lǘ      lǚ      lǜ      nǚ      nǜ      nüè
`.split(/\s+/)
);

/**
 * A set of valid pinyin syllables with tone marks that do not correspond to any Chinese characters.
 *
 * Notes:
 * - This set includes only pinyin syllables that are valid in standard Mandarin phonetics but have tone variations
 *   that do not map to any known Chinese characters.
 * - It does *not* include entirely non-existent or malformed pinyin syllables (e.g., "giao", "qa", "qo"), even if
 *   their initials and finals are individually valid in other combinations.
 * - Examples: "tē", "té", "tě" (valid syllable "te" with tones that do not correspond to characters).
 */
const unusedPinyin: Set<string> = new Set(
  `bén     bán     báng    bián    bín     bíng    biáo    béi     pǎ      bǐn     pòu     pié     piè     pìng    mēi     màng    miě     mié     miú     māi     miān    mīn     mìn     mīng    māng    mū      fō      fǒ      mē      fò
 mě      mè      fōu     fòu     dě      mé      dè      dèi     miǔ     dóu     dán     dēn     dén     děn     dèn     dáng    déi     déng    dóng    diā     diá     dià     diè     diáo    diú     diǔ     diù     dián    díng    diě     
 duí     duǐ     duán    dún     tá      tē      té      tě      téi     těi     tèi     dái     těng    tié     nē      nāi     nēi     néi     nōu     nǒu     nén     něn     nēng    něng    nōng    nǒng    ně      niě     niāo    niáo    
 nīn     nìn     niāng   niǎng   nīng    nuān    nuán    nǖ      nǘ      nüē     nüé     nüě     lé      lāi     lě      lān     liā     liá     lià     lié     liān    liāng   līng    luān    nuō     lǖ      lüē     lüé     gái     gēi     
 gèi     gáo     gán     gáng    géng    géi     guá     tèng    guái    guí     guán    gún     guáng   ká      kái     káo     kóu     góng    kēn     kán     kén     kèng    kéng    kóng    kú      kuá     kuó     kuō     kuái    kuán    
 kuàn    kún     hě      hěi     hèi     hēn     héi     hǎng    hěng    huǎ     huǎi    jiú     jián    jiáng   jíng    jióng   jiòng   jín     jún     juán    qiù     qiǒng   qiòng   quě     qǔn     qùn     xiǎ     xiú     xǔn     zhēi    
 zhéi    zhěi    zhán    zhén    zháng   zhéng   zhóng   zhuá    zhuà    zhuǒ    zhuò    zhuái   zhuí    zhuán   zhuáng  ché     chuǒ    zhún    chùn    shái    shēi    shěi    shèi    chuǐ    shán    sháng   shuó    shuǒ    shuái   shuá    
 shuī    shuán   shuǎn   shūn    shún    shuáng  rē      ré      rī      rí      rǐ      rāo     rōu     rān     rēn     rěng    rōng    rū      ruō     ruó     ruǒ     ruī     ràn     ruān    ruàn    rǔn     zà      zē      zēi     zóu     
 zěi     záng    zái     zóng    zén     zéng    zèi     zěng    zēn     zún     zù      cé      cě      cá      cóu     cǒu     cěn     cèn     cǎng    cōu     cǒng    cē      cǔ      cěng    cuǎn    zuán    sá      sé      sí      sǎi     
 sái     sáo     sóu     sán     sén     sěn     sèn     sáng    séng    sèng    sóng    suó     suán    zuí     sún     sě      én      ěn      sǔ      éng     ěng     sěng    èng     wái     wéng    yué     
`.split(/\s+/)
);

/**
 * Determines if pinyin syllables in diacritic mark notation is valid
 *
 * Notes:
 * - For the sake of consistency, all input is normalized to lower case.
 * - Invalid pinyin syllables may yield unpredictable results
 * - Only "standard" Pinyin syllables are validated.
 * - Does not support tone numbers (e.g., `"ni3"`, `"hao4"` will be considered invalid unless manually included)
 *
 *
 * @param input A pinyin string or an array of pinyin strings with diacritic tone marks. Each
 * string is treated entirely as a pinyin (i.e no pinyin separated by whitespaces in a single string).
 * The pinyin syllable is assumed to be valid.
 * @param options Options for inclusion/exclusion lists.
 * @param options.allowUnused Whether to check against a set of valid pinyin syllables with tone marks that do not
 * correspond to any Chinese characters. (e.g. "tē", "té", "tě"). Does not include entirely non-existent or malformed
 * pinyin syllables (e.g., "giao", "qa", "qo"), even if their initials and finals are individually valid in other
 * combinations. Set to false by default.
 * @param options.include User defined syllables to explicitly include.
 * @param options.exclude User defined syllables syllables to explicitly exclude.
 * @returns A single boolean or list of booleans describing if the provided pinyin syllable/s are valid.
 *
 * @example
 * isValidPinyin("líng"); // Returns true
 * isValidPinyin(["xiāng", "líng"]); // Returns [true, true]
 * isValidPinyin("tě"); // Returns false (no character has a pinyin tě)
 * isValidPinyin("tě", true); // Return true (valid syllable but unused tone)
 * isValidPinyin(["hello", "world", "pin", "yin", "han4", "zi4"]); // Returns [false, false, true, true, false, false] ("hello", "world" are not valid pinyin, "han4", "zi4" have numbers appended)
 * isValidPinyin(["hello", "world", "pin", "yin", "han4", "zi4"], {include: ["hello", "world", "han4", "zi4"]}); // Returns [true, true, true, true, true, true] ("hello", "world", "han4", "zi4" now manually included)
 * isValidPinyin(["hello", "world", "pin", "yin", "han4", "zi4"], {include: ["hello", "world", "han4", "zi4"], exclude: ["pin", "yin"]}); // Returns [true, true, false, false, true, true] ("pin", "yin" now manually excluded)
 * isValidPinyin("pin", { exclude:["pin"] }) // Returns false (user specified blacklist takes priority)
 */
function isValidPinyin(input: string, options?: Options): boolean;
function isValidPinyin(input: string[], options?: Options): boolean[];
function isValidPinyin(
  input: string | string[],
  { allowUnused = false, include = [], exclude = [] }: Options = {}
): boolean | boolean[] {
  const inputArray: string[] = Array.isArray(input) ? input : [input];
  const included: Set<string> = new Set(include);
  const excluded: Set<string> = new Set(exclude);

  const results: boolean[] = inputArray.map((pinyin) => {
    if (excluded.has(pinyin)) {
      return false;
    }

    if (included.has(pinyin)) {
      return true;
    }

    pinyin = pinyin.toLowerCase();

    if (allowUnused) {
      return validPinyin.has(pinyin) || unusedPinyin.has(pinyin);
    } else {
      return validPinyin.has(pinyin);
    }
  });

  return Array.isArray(input) ? results : results[0];
}

export { isValidPinyin };
