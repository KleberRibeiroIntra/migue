export interface CompetencyMapQuestion {
  id: string
  text: string
  options: string[]
}

export interface CompetencyMapCategory {
  title: string
  questions: CompetencyMapQuestion[]
}

export const competencyMapTitle = 'Migué — Mapa de Competências'

export const competencyMapCategories: CompetencyMapCategory[] = [
  {
    title: '1. Comunicação',
    questions: [
      {
        id: '1.1',
        text: 'Quando precisa explicar algo técnico para alguém que não domina o assunto, como você costuma agir?',
        options: [
          'Explico usando os termos técnicos que já conheço.',
          'Procuro adaptar a explicação à pessoa.',
          'Uso exemplos práticos para facilitar o entendimento.',
          'Primeiro tento entender o que a pessoa já sabe.',
        ],
      },
      {
        id: '1.2',
        text: 'Quando percebe que alguém não entendeu uma explicação sua, o que costuma fazer?',
        options: [
          'Explico novamente da mesma maneira.',
          'Tento explicar de outra forma.',
          'Uso um exemplo ou situação prática.',
          'Pergunto qual parte ficou confusa.',
        ],
      },
      {
        id: '1.3',
        text: 'Quando discorda de alguém durante uma discussão, como normalmente reage?',
        options: [
          'Apresento imediatamente meu ponto de vista.',
          'Procuro entender o argumento da outra pessoa.',
          'Apresento dados ou exemplos que sustentem minha opinião.',
          'Prefiro evitar o confronto e seguir em frente.',
        ],
      },
    ],
  },
  {
    title: '2. Resolução de Problemas',
    questions: [
      {
        id: '2.1',
        text: 'Quando surge um problema que você nunca enfrentou antes, o que costuma fazer primeiro?',
        options: [
          'Procuro alguém que já tenha enfrentado algo parecido.',
          'Pesquiso para entender melhor o problema.',
          'Começo a testar possíveis soluções.',
          'Tento identificar primeiro a causa do problema.',
        ],
      },
      {
        id: '2.2',
        text: 'Quando uma solução que você tentou não funciona, como costuma reagir?',
        options: [
          'Procuro imediatamente outra alternativa.',
          'Tento entender por que a solução falhou.',
          'Peço ajuda para encontrar outro caminho.',
          'Volto algumas etapas e reavalio o problema.',
        ],
      },
      {
        id: '2.3',
        text: 'Quando recebe um problema aparentemente urgente, qual costuma ser sua primeira reação?',
        options: [
          'Começo a agir imediatamente.',
          'Tento entender o impacto antes de agir.',
          'Confirmo primeiro se realmente é uma prioridade.',
          'Divido o problema em partes menores.',
        ],
      },
    ],
  },
  {
    title: '3. Organização',
    questions: [
      {
        id: '3.1',
        text: 'Quando recebe várias tarefas ao mesmo tempo, como costuma organizá-las?',
        options: [
          'Começo pela tarefa que chegou primeiro.',
          'Começo pela que considero mais importante.',
          'Organizo as tarefas por prioridade e prazo.',
          'Escolho uma tarefa e vou resolvendo uma por vez.',
        ],
      },
      {
        id: '3.2',
        text: 'Como costuma acompanhar aquilo que precisa fazer?',
        options: [
          'Mantenho tudo na memória.',
          'Faço anotações quando necessário.',
          'Utilizo listas, ferramentas ou algum sistema de organização.',
          'Organizo somente as tarefas mais importantes.',
        ],
      },
      {
        id: '3.3',
        text: 'Quando percebe que sua organização inicial não está funcionando, o que faz?',
        options: [
          'Continuo seguindo o planejamento original.',
          'Faço alguns ajustes.',
          'Reorganizo completamente as prioridades.',
          'Peço ajuda para definir o que deve ser priorizado.',
        ],
      },
    ],
  },
  {
    title: '4. Proatividade',
    questions: [
      {
        id: '4.1',
        text: 'Você percebe um problema que ainda não está afetando ninguém. O que costuma fazer?',
        options: [
          'Espero alguém solicitar alguma ação.',
          'Aviso quem é responsável.',
          'Tento resolver antes que o problema aumente.',
          'Registro a situação para tratar posteriormente.',
        ],
      },
      {
        id: '4.2',
        text: 'Quando termina uma tarefa antes do prazo, o que normalmente faz?',
        options: [
          'Aguardo a próxima tarefa.',
          'Procuro algo que possa melhorar.',
          'Pergunto se existe outra prioridade.',
          'Aproveito o tempo para descansar ou fazer outra coisa.',
        ],
      },
      {
        id: '4.3',
        text: 'Você identifica uma melhoria em um processo que funciona, mas poderia ser melhor. Como costuma agir?',
        options: [
          'Faço a mudança imediatamente.',
          'Apresento a ideia antes de alterar o processo.',
          'Registro a sugestão para discutir posteriormente.',
          'Prefiro não alterar algo que já funciona.',
        ],
      },
    ],
  },
  {
    title: '5. Adaptabilidade',
    questions: [
      {
        id: '5.1',
        text: 'Quando uma prioridade muda repentinamente, como você costuma reagir?',
        options: [
          'Tenho dificuldade para mudar o planejamento.',
          'Ajusto o que estava fazendo e continuo.',
          'Reorganizo rapidamente minhas prioridades.',
          'Preciso entender primeiro o motivo da mudança.',
        ],
      },
      {
        id: '5.2',
        text: 'Quando precisa trabalhar com uma ferramenta nova, como costuma começar?',
        options: [
          'Espero alguém me ensinar.',
          'Procuro documentação ou exemplos.',
          'Começo a explorar por conta própria.',
          'Procuro alguém que já conheça a ferramenta.',
        ],
      },
      {
        id: '5.3',
        text: 'Quando um plano que você preparou deixa de fazer sentido, o que costuma fazer?',
        options: [
          'Tento manter o plano original.',
          'Faço pequenos ajustes.',
          'Reformulo o plano completamente.',
          'Paro para entender melhor o novo cenário.',
        ],
      },
    ],
  },
  {
    title: '6. Trabalho em Equipe',
    questions: [
      {
        id: '6.1',
        text: 'Quando trabalha em uma atividade que depende de outras pessoas, como costuma agir?',
        options: [
          'Faço minha parte e aguardo os demais.',
          'Procuro manter todos alinhados.',
          'Tento ajudar quando percebo alguma dificuldade.',
          'Acompanho o andamento das partes que dependem do meu trabalho.',
        ],
      },
      {
        id: '6.2',
        text: 'Quando percebe que alguém da equipe está com dificuldade, o que costuma fazer?',
        options: [
          'Espero que a pessoa peça ajuda.',
          'Pergunto se ela precisa de ajuda.',
          'Tento ajudar diretamente.',
          'Aviso alguém que possa apoiar a situação.',
        ],
      },
      {
        id: '6.3',
        text: 'Quando sua opinião é diferente da maioria da equipe, como costuma agir?',
        options: [
          'Defendo minha opinião até o fim.',
          'Apresento meus argumentos e escuto os demais.',
          'Aceito a decisão da maioria.',
          'Procuro uma alternativa que contemple os diferentes pontos de vista.',
        ],
      },
    ],
  },
  {
    title: '7. Pensamento Crítico',
    questions: [
      {
        id: '7.1',
        text: 'Quando recebe uma informação importante, como costuma avaliá-la?',
        options: [
          'Considero a informação recebida como verdadeira.',
          'Procuro entender a origem da informação.',
          'Comparo com outras fontes.',
          'Analiso os dados antes de tirar uma conclusão.',
        ],
      },
      {
        id: '7.2',
        text: 'Quando uma solução parece funcionar muito bem, o que costuma fazer?',
        options: [
          'Implemento e sigo em frente.',
          'Tento entender por que funciona.',
          'Procuro possíveis limitações.',
          'Comparo com outras alternativas.',
        ],
      },
      {
        id: '7.3',
        text: 'Quando alguém apresenta uma opinião diferente da sua, como costuma reagir?',
        options: [
          'Procuro defender meu ponto de vista.',
          'Tento entender os argumentos apresentados.',
          'Procuro evidências que sustentem cada posição.',
          'Reavalio minha opinião quando encontro novos dados.',
        ],
      },
    ],
  },
  {
    title: '8. Gestão de Tempo',
    questions: [
      {
        id: '8.1',
        text: 'Quando possui várias tarefas com prazos diferentes, como costuma decidir o que fazer primeiro?',
        options: [
          'Começo pela tarefa mais rápida.',
          'Começo pela tarefa com prazo mais próximo.',
          'Considero prazo, impacto e esforço.',
          'Começo pela tarefa que considero mais importante.',
        ],
      },
      {
        id: '8.2',
        text: 'Quando percebe que não conseguirá cumprir um prazo, o que costuma fazer?',
        options: [
          'Tento trabalhar mais rápido.',
          'Aviso assim que percebo o risco.',
          'Reavalio as prioridades.',
          'Procuro negociar o prazo ou o escopo.',
        ],
      },
      {
        id: '8.3',
        text: 'Quando possui um período livre durante o trabalho, como costuma utilizá-lo?',
        options: [
          'Começo alguma tarefa pendente.',
          'Organizo minhas próximas atividades.',
          'Procuro melhorias ou aprendizados.',
          'Aproveito para descansar antes da próxima demanda.',
        ],
      },
    ],
  },
  {
    title: '9. Responsabilidade',
    questions: [
      {
        id: '9.1',
        text: 'Quando comete um erro que afeta uma atividade, como costuma agir?',
        options: [
          'Tento corrigir antes de comunicar.',
          'Comunico o problema e procuro corrigir.',
          'Analiso primeiro o impacto do erro.',
          'Procuro entender como evitar que aconteça novamente.',
        ],
      },
      {
        id: '9.2',
        text: 'Quando assume uma tarefa, o que normalmente considera como sua responsabilidade?',
        options: [
          'Entregar aquilo que foi solicitado.',
          'Garantir que a tarefa seja concluída corretamente.',
          'Comunicar problemas durante o processo.',
          'Acompanhar o resultado até o final.',
        ],
      },
      {
        id: '9.3',
        text: 'Quando percebe que não conseguirá cumprir um compromisso assumido, como reage?',
        options: [
          'Tento resolver sozinho.',
          'Comunico a situação.',
          'Procuro uma alternativa.',
          'Reavalio o compromisso e proponho uma nova solução.',
        ],
      },
    ],
  },
  {
    title: '10. Aprendizado',
    questions: [
      {
        id: '10.1',
        text: 'Quando precisa aprender algo novo para realizar uma tarefa, como costuma fazer?',
        options: [
          'Procuro um exemplo pronto.',
          'Pesquiso documentação e materiais.',
          'Pergunto para alguém que conhece o assunto.',
          'Tento aprender fazendo.',
        ],
      },
      {
        id: '10.2',
        text: 'Depois de cometer um erro, o que normalmente faz?',
        options: [
          'Corrijo e sigo em frente.',
          'Tento entender o que causou o erro.',
          'Procuro aprender com a situação.',
          'Registro o que aconteceu para evitar repetição.',
        ],
      },
      {
        id: '10.3',
        text: 'Quando aprende uma maneira melhor de realizar uma tarefa, o que costuma fazer?',
        options: [
          'Passo a utilizá-la.',
          'Comparo com a forma anterior.',
          'Compartilho o conhecimento com outras pessoas.',
          'Procuro aplicar o aprendizado em outras situações.',
        ],
      },
    ],
  },
  {
    title: '11. Abertura a Feedback',
    questions: [
      {
        id: '11.1',
        text: 'Quando recebe um feedback sobre algo que poderia melhorar, como costuma reagir?',
        options: [
          'Procuro entender exatamente o que aconteceu.',
          'Penso sobre o feedback antes de responder.',
          'Pergunto como poderia melhorar.',
          'Tenho dificuldade em aceitar críticas inicialmente.',
        ],
      },
      {
        id: '11.2',
        text: 'Quando recebe um feedback com o qual não concorda, o que costuma fazer?',
        options: [
          'Explico imediatamente meu ponto de vista.',
          'Procuro entender os motivos do feedback.',
          'Peço exemplos concretos.',
          'Reavalio minha posição depois da conversa.',
        ],
      },
      {
        id: '11.3',
        text: 'Quando alguém elogia seu trabalho, como costuma reagir?',
        options: [
          'Agradeço e sigo normalmente.',
          'Procuro entender o que funcionou bem.',
          'Tento repetir o comportamento em outras situações.',
          'Compartilho o reconhecimento com quem participou.',
        ],
      },
    ],
  },
  {
    title: '12. Inteligência Emocional',
    questions: [
      {
        id: '12.1',
        text: 'Quando está sob pressão, como costuma perceber seu próprio comportamento?',
        options: [
          'Continuo trabalhando normalmente.',
          'Percebo que fico mais impaciente.',
          'Procuro fazer uma pausa ou reorganizar a situação.',
          'Tento entender o que está causando a pressão.',
        ],
      },
      {
        id: '12.2',
        text: 'Quando alguém reage de maneira agressiva durante uma conversa, como costuma agir?',
        options: [
          'Respondo diretamente.',
          'Tento manter a calma.',
          'Procuro entender o motivo da reação.',
          'Encerro a conversa e retomo posteriormente.',
        ],
      },
      {
        id: '12.3',
        text: 'Quando percebe que está frustrado com uma situação, o que costuma fazer?',
        options: [
          'Continuo trabalhando normalmente.',
          'Procuro conversar com alguém.',
          'Tento entender a causa da frustração.',
          'Faço uma pausa antes de continuar.',
        ],
      },
    ],
  },
  {
    title: '13. Tomada de Decisão',
    questions: [
      {
        id: '13.1',
        text: 'Quando precisa tomar uma decisão importante, o que costuma considerar?',
        options: ['Minha experiência.', 'Dados disponíveis.', 'Opiniões de outras pessoas.', 'Impacto e possíveis consequências.'],
      },
      {
        id: '13.2',
        text: 'Quando não possui todas as informações necessárias para decidir, o que costuma fazer?',
        options: [
          'Aguardo ter todas as informações.',
          'Tomo a decisão com o que tenho disponível.',
          'Procuro informações adicionais.',
          'Consulto alguém antes de decidir.',
        ],
      },
      {
        id: '13.3',
        text: 'Quando percebe que tomou uma decisão errada, como costuma agir?',
        options: [
          'Tento corrigir rapidamente.',
          'Analiso o que levou à decisão.',
          'Comunico o problema.',
          'Procuro evitar que a situação se repita.',
        ],
      },
    ],
  },
  {
    title: '14. Criatividade',
    questions: [
      {
        id: '14.1',
        text: 'Quando precisa resolver algo para o qual não existe um procedimento definido, como costuma agir?',
        options: [
          'Procuro adaptar alguma solução existente.',
          'Crio uma solução nova.',
          'Procuro referências em outras situações.',
          'Peço sugestões para outras pessoas.',
        ],
      },
      {
        id: '14.2',
        text: 'Quando recebe uma tarefa que poderia ser feita de várias maneiras, como escolhe?',
        options: [
          'Utilizo a maneira que já conheço.',
          'Procuro a maneira mais rápida.',
          'Comparo diferentes possibilidades.',
          'Tento encontrar uma abordagem diferente.',
        ],
      },
      {
        id: '14.3',
        text: 'Quando identifica uma oportunidade de fazer algo de uma maneira diferente, o que costuma fazer?',
        options: ['Testo a ideia.', 'Converso com alguém antes.', 'Comparo com a maneira atual.', 'Deixo para outro momento.'],
      },
    ],
  },
  {
    title: '15. Colaboração',
    questions: [
      {
        id: '15.1',
        text: 'Quando precisa realizar uma tarefa que envolve conhecimento de outra pessoa, como costuma agir?',
        options: [
          'Tento resolver sozinho primeiro.',
          'Peço ajuda diretamente.',
          'Procuro aprender com a pessoa.',
          'Divido a tarefa com ela.',
        ],
      },
      {
        id: '15.2',
        text: 'Quando possui conhecimento que pode ajudar outra pessoa, o que costuma fazer?',
        options: [
          'Espero que ela pergunte.',
          'Ofereço ajuda.',
          'Compartilho o conhecimento espontaneamente.',
          'Procuro criar um material para facilitar.',
        ],
      },
      {
        id: '15.3',
        text: 'Quando uma atividade depende da contribuição de várias pessoas, como costuma participar?',
        options: [
          'Faço minha parte.',
          'Procuro manter os envolvidos informados.',
          'Ajudo a organizar o trabalho.',
          'Procuro identificar possíveis problemas antecipadamente.',
        ],
      },
    ],
  },
  {
    title: '16. Liderança',
    questions: [
      {
        id: '16.1',
        text: 'Quando percebe que uma equipe está sem direção clara, o que costuma fazer?',
        options: [
          'Aguardo alguém assumir a liderança.',
          'Procuro entender o que precisa ser feito.',
          'Tomo a iniciativa de organizar as próximas ações.',
          'Sugiro que definam responsabilidades.',
        ],
      },
      {
        id: '16.2',
        text: 'Quando precisa coordenar uma atividade com outras pessoas, como costuma agir?',
        options: [
          'Distribuo as tarefas.',
          'Alinho objetivos e responsabilidades.',
          'Acompanho o andamento.',
          'Procuro apoiar quem estiver com dificuldades.',
        ],
      },
      {
        id: '16.3',
        text: 'Quando uma decisão da equipe não produz o resultado esperado, como costuma agir?',
        options: [
          'Procuro identificar o que deu errado.',
          'Converso com os envolvidos.',
          'Busco uma nova abordagem.',
          'Reavalio as responsabilidades e o processo.',
        ],
      },
    ],
  },
  {
    title: '17. Negociação',
    questions: [
      {
        id: '17.1',
        text: 'Quando precisa chegar a um acordo com alguém que possui uma opinião diferente, o que costuma fazer?',
        options: [
          'Defendo minha posição.',
          'Procuro entender o que a outra pessoa precisa.',
          'Busco um meio-termo.',
          'Procuro dados que ajudem na decisão.',
        ],
      },
      {
        id: '17.2',
        text: 'Quando uma pessoa solicita algo que você não consegue entregar, como costuma responder?',
        options: [
          'Explico que não é possível.',
          'Tento negociar prazo ou escopo.',
          'Procuro uma alternativa.',
          'Pergunto qual é a necessidade principal.',
        ],
      },
      {
        id: '17.3',
        text: 'Quando precisa priorizar entre demandas conflitantes, como costuma agir?',
        options: [
          'Escolho a que considero mais importante.',
          'Procuro alinhar as prioridades com os envolvidos.',
          'Avalio impacto e urgência.',
          'Tento encontrar uma solução que atenda parcialmente às demandas.',
        ],
      },
    ],
  },
  {
    title: '18. Empatia',
    questions: [
      {
        id: '18.1',
        text: 'Quando percebe que alguém está tendo dificuldade, como costuma agir?',
        options: [
          'Espero que a pessoa peça ajuda.',
          'Pergunto se está tudo bem.',
          'Tento entender o que ela está enfrentando.',
          'Ofereço ajuda diretamente.',
        ],
      },
      {
        id: '18.2',
        text: 'Quando alguém apresenta uma opinião que você considera equivocada, como costuma responder?',
        options: [
          'Explico por que discordo.',
          'Procuro entender o ponto de vista primeiro.',
          'Apresento outra perspectiva.',
          'Pergunto quais fatores levaram àquela opinião.',
        ],
      },
      {
        id: '18.3',
        text: 'Quando uma pessoa reage de maneira diferente do que você esperava, o que costuma fazer?',
        options: [
          'Tento entender o comportamento.',
          'Pergunto diretamente o que aconteceu.',
          'Continuo normalmente.',
          'Reavalio minha própria abordagem.',
        ],
      },
    ],
  },
  {
    title: '19. Foco em Resultados',
    questions: [
      {
        id: '19.1',
        text: 'Quando recebe uma tarefa, como costuma definir se ela foi bem executada?',
        options: [
          'Quando termino o que foi solicitado.',
          'Quando entrego dentro do prazo.',
          'Quando o resultado atende à necessidade.',
          'Quando consigo melhorar o resultado esperado.',
        ],
      },
      {
        id: '19.2',
        text: 'Quando percebe que uma tarefa está consumindo mais tempo do que deveria, o que costuma fazer?',
        options: [
          'Continuo até terminar.',
          'Procuro uma maneira mais eficiente.',
          'Reavalio se a tarefa realmente precisa ser feita daquela maneira.',
          'Peço ajuda.',
        ],
      },
      {
        id: '19.3',
        text: 'Quando precisa escolher entre entregar rapidamente e entregar com mais qualidade, como costuma decidir?',
        options: [
          'Priorizo a velocidade.',
          'Priorizo a qualidade.',
          'Avalio o impacto de cada opção.',
          'Procuro equilibrar os dois fatores.',
        ],
      },
    ],
  },
  {
    title: '20. Planejamento',
    questions: [
      {
        id: '20.1',
        text: 'Quando começa um projeto novo, qual costuma ser sua primeira preocupação?',
        options: ['Entender o objetivo.', 'Listar as tarefas.', 'Definir prazos.', 'Identificar riscos e dependências.'],
      },
      {
        id: '20.2',
        text: 'Quando possui uma tarefa grande e complexa, como costuma começar?',
        options: [
          'Começo pela primeira parte que consigo executar.',
          'Divido a tarefa em etapas.',
          'Procuro entender todo o cenário primeiro.',
          'Converso com outras pessoas envolvidas.',
        ],
      },
      {
        id: '20.3',
        text: 'Quando percebe que um planejamento está atrasado, o que costuma fazer?',
        options: [
          'Continuo seguindo o planejamento.',
          'Reorganizo os prazos.',
          'Reavalio as prioridades.',
          'Procuro identificar a causa do atraso antes de alterar o plano.',
        ],
      },
    ],
  },
  {
    title: '21. Resiliência',
    questions: [
      {
        id: '21.1',
        text: 'Quando uma tentativa sua não produz o resultado esperado, como costuma reagir?',
        options: [
          'Tento novamente.',
          'Procuro entender o que deu errado.',
          'Procuro outra abordagem.',
          'Peço ajuda para encontrar uma alternativa.',
        ],
      },
      {
        id: '21.2',
        text: 'Quando recebe várias demandas difíceis ao mesmo tempo, como costuma lidar?',
        options: [
          'Resolvo uma por uma.',
          'Priorizo as mais importantes.',
          'Procuro ajuda para reorganizar as demandas.',
          'Tento dividir os problemas em partes menores.',
        ],
      },
      {
        id: '21.3',
        text: 'Quando passa por uma situação profissional frustrante, o que costuma fazer depois?',
        options: [
          'Sigo normalmente.',
          'Procuro entender o que aconteceu.',
          'Converso com alguém sobre a situação.',
          'Penso no que poderia fazer diferente no futuro.',
        ],
      },
    ],
  },
  {
    title: '22. Autonomia',
    questions: [
      {
        id: '22.1',
        text: 'Quando recebe uma tarefa com poucas instruções, como costuma começar?',
        options: [
          'Procuro mais informações.',
          'Tento definir sozinho o que precisa ser feito.',
          'Pergunto quais são as expectativas.',
          'Procuro referências de trabalhos anteriores.',
        ],
      },
      {
        id: '22.2',
        text: 'Quando encontra uma dificuldade durante uma tarefa, o que costuma fazer antes de pedir ajuda?',
        options: [
          'Tento resolver sozinho.',
          'Pesquiso possíveis soluções.',
          'Tento algumas alternativas.',
          'Pergunto rapidamente para evitar perder tempo.',
        ],
      },
      {
        id: '22.3',
        text: 'Quando recebe liberdade para decidir como realizar uma tarefa, como costuma agir?',
        options: [
          'Sigo uma forma que já conheço.',
          'Escolho a abordagem que considero mais eficiente.',
          'Comparo diferentes possibilidades.',
          'Procuro validar a abordagem antes de começar.',
        ],
      },
    ],
  },
  {
    title: '23. Atenção aos Detalhes',
    questions: [
      {
        id: '23.1',
        text: 'Quando termina uma tarefa importante, o que costuma fazer antes de entregá-la?',
        options: [
          'Entrego assim que termino.',
          'Faço uma revisão rápida.',
          'Confiro os principais pontos.',
          'Faço uma revisão detalhada.',
        ],
      },
      {
        id: '23.2',
        text: 'Quando encontra uma pequena inconsistência em um trabalho, como costuma agir?',
        options: [
          'Corrijo imediatamente.',
          'Verifico se ela realmente causa impacto.',
          'Registro para corrigir posteriormente.',
          'Procuro entender por que aconteceu.',
        ],
      },
      {
        id: '23.3',
        text: 'Quando trabalha com informações importantes, como costuma evitar erros?',
        options: [
          'Confio na minha atenção.',
          'Faço revisões.',
          'Utilizo listas ou validações.',
          'Peço que outra pessoa confira quando necessário.',
        ],
      },
    ],
  },
  {
    title: '24. Evolução Contínua',
    questions: [
      {
        id: '24.1',
        text: 'Quando percebe que existe uma maneira melhor de realizar uma atividade que você já domina, o que costuma fazer?',
        options: [
          'Continuo usando a maneira atual.',
          'Experimento a nova abordagem.',
          'Comparo os resultados.',
          'Procuro entender se a mudança realmente vale a pena.',
        ],
      },
      {
        id: '24.2',
        text: 'Quando olha para um trabalho realizado anteriormente, o que costuma procurar?',
        options: [
          'Se o resultado foi alcançado.',
          'O que poderia ter sido feito melhor.',
          'O que aprendi com a experiência.',
          'O que poderia fazer diferente hoje.',
        ],
      },
      {
        id: '24.3',
        text: 'Quando percebe uma evolução em determinada habilidade sua, o que costuma fazer?',
        options: [
          'Continuo utilizando essa habilidade.',
          'Procuro novos desafios para desenvolvê-la.',
          'Compartilho o que aprendi.',
          'Tento aplicar a habilidade em situações diferentes.',
        ],
      },
    ],
  },
]
