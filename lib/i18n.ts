export type Locale = "en" | "ko" | "jp";

export const locales: Locale[] = ["en", "ko", "jp"];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  jp: "日本語"
};

export const dictionary: Record<Locale, {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    how: string;
    output: string;
    trust: string;
    faq: string;
    cta: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    disclaimer: string;
    primaryCta: string;
    secondaryCta: string;
  };
  how: {
    title: string;
    steps: { title: string; description: string }[];
  };
  output: {
    title: string;
    cards: { title: string; points: string[] }[];
  };
  trust: {
    title: string;
    points: string[];
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  waitlist: {
    title: string;
    label: string;
    placeholder: string;
    helper: string;
    success: string;
    submit: string;
    requestDemo: string;
    invalidEmail: string;
    error: string;
  };
  incident: {
    cta: string;
    title: string;
    subtitle: string;
    form: {
      title: string;
      description: string;
      email: string;
      company: string;
      system: string;
      notes: string;
      submit: string;
      success: string;
    };
    uploader: {
      title: string;
      description: string;
      videoLabel: string;
      logsLabel: string;
      optional: string;
      chooseFile: string;
      upload: string;
      uploading: string;
      uploaded: string;
      retry: string;
      invalidType: string;
      tooLarge: string;
      genericError: string;
      maxSizeHint: string;
      progress: string;
    };
    status: {
      title: string;
      subtitle: string;
      fieldsTitle: string;
      filesTitle: string;
      empty: string;
      back: string;
      view: string;
      uploadedAt: string;
      roleVideo: string;
      roleLogs: string;
    };
  };
  footer: {
    contact: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  pages: {
    privacyTitle: string;
    privacyBody: string[];
    termsTitle: string;
    termsBody: string[];
  };
}> = {
  en: {
    meta: {
      title: "Srebi | Insurance Readiness Reports",
      description: "Insurer-style incident reports that support review and submission as reference. Not an insurance product."
    },
    nav: {
      how: "How it works",
      output: "Output",
      trust: "Trust",
      faq: "FAQ",
      cta: "Join waitlist"
    },
    hero: {
      headline: "Insurance readiness reports, built like an insurer would",
      subheadline: "Srebi turns incident data into insurer-style reports you can submit as reference. Fast, structured, and clear for stakeholders.",
      disclaimer: "Srebi is not an insurance product and does not make claim or coverage decisions.",
      primaryCta: "Join waitlist",
      secondaryCta: "Request demo"
    },
    how: {
      title: "How it works",
      steps: [
        {
          title: "Upload",
          description: "Bring evidence, logs, and incident notes. We support structured and unstructured sources."
        },
        {
          title: "Auto timeline & clip",
          description: "Srebi builds a timeline, highlights key artifacts, and links evidence in context."
        },
        {
          title: "Insurer-style report",
          description: "Generate an insurer-style incident report that supports review and submission as reference."
        }
      ]
    },
    output: {
      title: "Output that stakeholders understand",
      cards: [
        {
          title: "Timeline",
          points: ["Event-by-event reconstruction", "Critical impact windows", "Audit-ready formatting"]
        },
        {
          title: "Evidence links",
          points: ["Source artifacts preserved", "Clear provenance notes", "Attachable to insurer workflows"]
        },
        {
          title: "Prevention checklist",
          points: ["Root-cause signals", "Policy improvements", "Risk readiness actions"]
        }
      ]
    },
    trust: {
      title: "Trust & transparency",
      points: [
        "Srebi is not an insurance product and does not determine liability, coverage, or payouts.",
        "Final decisions remain with insurers, legal teams, and other stakeholders.",
        "Sensitive data can be anonymized or excluded on request.",
        "You control retention settings and can request full deletion."
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "Is this insurance?",
          a: "No. Srebi supports incident review with insurer-style reporting, but it is not an insurance product."
        },
        {
          q: "Can I submit this to an insurer?",
          a: "Yes, you can submit Srebi reports as reference material alongside your claim or documentation."
        },
        {
          q: "Does this have legal effect?",
          a: "Srebi outputs are informational and meant to support internal or insurer review only."
        },
        {
          q: "What data do you need?",
          a: "Incident notes, logs, communications, and relevant evidence files. You choose what to include."
        },
        {
          q: "How is data used?",
          a: "Data is processed to build your report and is not used to make insurance decisions."
        },
        {
          q: "How long does analysis take?",
          a: "Typical turnaround is hours, depending on volume and complexity."
        }
      ]
    },
    waitlist: {
      title: "Join the waitlist",
      label: "Work email",
      placeholder: "you@company.com",
      helper: "No spam. We will only reach out about the Srebi launch.",
      success: "Thanks! We will be in touch soon.",
      submit: "Join waitlist",
      requestDemo: "Request demo",
      invalidEmail: "Please enter a valid email address.",
      error: "We could not submit this yet. Please email hello@srebi.com to join."
    },
    incident: {
      cta: "Submit incident",
      title: "Incident submission",
      subtitle: "Create an incident record and upload supporting files. This supports insurer-style reporting, not insurance decisions.",
      form: {
        title: "Incident details",
        description: "Optional context to help structure the report.",
        email: "Contact email",
        company: "Company or team",
        system: "System type",
        notes: "Notes",
        submit: "Create incident",
        success: "Incident created. Upload files below."
      },
      uploader: {
        title: "Upload files",
        description: "Upload a video and/or logs. Files are sent directly to secure storage.",
        videoLabel: "Incident video (MP4)",
        logsLabel: "Logs archive (ZIP/JSON/LOG)",
        optional: "Optional",
        chooseFile: "Choose file",
        upload: "Upload",
        uploading: "Uploading...",
        uploaded: "Uploaded",
        retry: "Retry",
        invalidType: "Unsupported file type.",
        tooLarge: "File exceeds 1GB limit.",
        genericError: "Upload failed. Please retry.",
        maxSizeHint: "Max 1GB each. Direct upload to secure storage.",
        progress: "Progress"
      },
      status: {
        title: "Incident status",
        subtitle: "Share this page with teammates or return later to view uploaded files.",
        fieldsTitle: "Incident details",
        filesTitle: "Uploaded files",
        empty: "No files uploaded yet.",
        back: "Back to submission",
        view: "View incident status",
        uploadedAt: "Uploaded",
        roleVideo: "Video",
        roleLogs: "Logs"
      }
    },
    footer: {
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms",
      rights: "All rights reserved."
    },
    pages: {
      privacyTitle: "Data & Privacy",
      privacyBody: [
        "Srebi only processes data you choose to submit. You can anonymize or exclude sensitive materials at any time.",
        "We use your data to generate insurer-style incident reports and to support incident review workflows.",
        "You can request deletion and export of your data. We never sell your information."
      ],
      termsTitle: "Terms",
      termsBody: [
        "Srebi provides incident reporting tools and does not offer insurance coverage or claims decisions.",
        "You are responsible for the accuracy of submitted data and how you use generated reports.",
        "By using Srebi, you agree that final decisions remain with insurers, legal counsel, and stakeholders."
      ]
    }
  },
  ko: {
    meta: {
      title: "Srebi | 보험 준비형 사고 리포트",
      description: "보험사 스타일의 사고 리포트를 빠르게 생성해 검토와 참고 제출을 돕습니다. 보험 상품이 아닙니다."
    },
    nav: {
      how: "작동 방식",
      output: "산출물",
      trust: "신뢰",
      faq: "FAQ",
      cta: "대기자 등록"
    },
    hero: {
      headline: "보험사 방식으로 구성된 보험 준비형 사고 리포트",
      subheadline: "Srebi는 사고 데이터를 보험사 스타일 리포트로 정리해 참고 제출과 내부 검토를 지원합니다.",
      disclaimer: "Srebi는 보험 상품이 아니며 판단이나 보상 결정을 내리지 않습니다.",
      primaryCta: "대기자 등록",
      secondaryCta: "데모 요청"
    },
    how: {
      title: "작동 방식",
      steps: [
        {
          title: "업로드",
          description: "증빙, 로그, 사고 메모를 업로드하세요. 구조화/비구조화 자료 모두 지원합니다."
        },
        {
          title: "자동 타임라인",
          description: "핵심 이벤트를 정리하고 증거 링크를 맥락과 함께 연결합니다."
        },
        {
          title: "보험사 스타일 리포트",
          description: "검토와 참고 제출을 위한 보험사 스타일 사고 리포트를 생성합니다."
        }
      ]
    },
    output: {
      title: "이해하기 쉬운 산출물",
      cards: [
        {
          title: "타임라인",
          points: ["사건 흐름 재구성", "중요 영향 구간 요약", "감사 대응 포맷"]
        },
        {
          title: "증거 링크",
          points: ["원본 자료 보존", "출처 근거 표시", "보험사 제출 참고용"]
        },
        {
          title: "예방 체크리스트",
          points: ["근본 원인 시그널", "정책 개선 포인트", "리스크 준비 항목"]
        }
      ]
    },
    trust: {
      title: "신뢰와 투명성",
      points: [
        "Srebi는 보험 상품이 아니며 책임, 보장, 지급을 판단하지 않습니다.",
        "최종 판단은 보험사, 법률 자문, 이해관계자가 수행합니다.",
        "민감 데이터는 익명화하거나 제외 요청이 가능합니다.",
        "보관 설정을 직접 제어하고 삭제 요청을 할 수 있습니다."
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "보험 상품인가요?",
          a: "아니요. Srebi는 보험사 스타일 리포트로 사고 검토를 돕는 도구입니다."
        },
        {
          q: "보험사에 제출할 수 있나요?",
          a: "네, 참고 자료로 제출할 수 있습니다."
        },
        {
          q: "법적 효력이 있나요?",
          a: "Srebi의 산출물은 참고용이며 최종 결정은 이해관계자가 합니다."
        },
        {
          q: "어떤 데이터를 필요로 하나요?",
          a: "사고 메모, 로그, 커뮤니케이션 기록, 증빙 파일 등 필요한 것만 선택합니다."
        },
        {
          q: "데이터는 어떻게 사용되나요?",
          a: "리포트 생성과 사고 검토 지원에만 사용되며 보험 판단에 사용되지 않습니다."
        },
        {
          q: "분석에는 얼마나 걸리나요?",
          a: "일반적으로 수 시간 내에 완료되며 데이터 규모에 따라 달라집니다."
        }
      ]
    },
    waitlist: {
      title: "대기자 등록",
      label: "업무용 이메일",
      placeholder: "you@company.com",
      helper: "스팸은 보내지 않습니다. 출시 소식만 안내합니다.",
      success: "감사합니다. 곧 연락드리겠습니다.",
      submit: "대기자 등록",
      requestDemo: "데모 요청",
      invalidEmail: "올바른 이메일 주소를 입력해 주세요.",
      error: "지금은 전송할 수 없습니다. hello@srebi.com으로 이메일을 보내 주세요."
    },
    incident: {
      cta: "사고 접수",
      title: "사고 접수",
      subtitle: "사고 기록을 만들고 파일을 업로드하세요. 보험 판단이 아닌 보험사 스타일 리포트를 위한 절차입니다.",
      form: {
        title: "사고 정보",
        description: "리포트를 구성하는 데 도움이 되는 선택 항목입니다.",
        email: "연락 이메일",
        company: "회사/팀",
        system: "시스템 유형",
        notes: "메모",
        submit: "사고 생성",
        success: "사고가 생성되었습니다. 아래에서 파일을 업로드하세요."
      },
      uploader: {
        title: "파일 업로드",
        description: "영상과 로그를 업로드하세요. 파일은 보안 스토리지로 직접 전송됩니다.",
        videoLabel: "사고 영상 (MP4)",
        logsLabel: "로그 파일 (ZIP/JSON/LOG)",
        optional: "선택",
        chooseFile: "파일 선택",
        upload: "업로드",
        uploading: "업로드 중...",
        uploaded: "업로드 완료",
        retry: "재시도",
        invalidType: "지원하지 않는 파일 형식입니다.",
        tooLarge: "파일 용량이 1GB를 초과했습니다.",
        genericError: "업로드에 실패했습니다. 다시 시도해 주세요.",
        maxSizeHint: "각 파일 최대 1GB. 보안 스토리지로 직접 업로드.",
        progress: "진행률"
      },
      status: {
        title: "사고 상태",
        subtitle: "팀과 공유하거나 나중에 돌아와 업로드된 파일을 확인하세요.",
        fieldsTitle: "사고 정보",
        filesTitle: "업로드된 파일",
        empty: "아직 업로드된 파일이 없습니다.",
        back: "접수로 돌아가기",
        view: "사고 상태 보기",
        uploadedAt: "업로드",
        roleVideo: "영상",
        roleLogs: "로그"
      }
    },
    footer: {
      contact: "문의",
      privacy: "개인정보",
      terms: "이용약관",
      rights: "모든 권리 보유."
    },
    pages: {
      privacyTitle: "데이터 및 개인정보",
      privacyBody: [
        "Srebi는 사용자가 제출한 데이터만 처리합니다. 민감 자료는 익명화하거나 제외할 수 있습니다.",
        "데이터는 보험사 스타일 리포트 생성과 사고 검토 지원에 사용됩니다.",
        "데이터 삭제 및 내보내기를 요청할 수 있으며, 정보를 판매하지 않습니다."
      ],
      termsTitle: "이용약관",
      termsBody: [
        "Srebi는 사고 리포트 도구이며 보험 보장 또는 보상 결정을 제공하지 않습니다.",
        "제출 데이터의 정확성과 리포트 활용에 대한 책임은 사용자에게 있습니다.",
        "최종 결정은 보험사, 법률 자문, 이해관계자가 수행합니다."
      ]
    }
  },
  jp: {
    meta: {
      title: "Srebi | 保険準備レポート",
      description: "保険会社スタイルの事故レポートでレビューと参考提出を支援します。保険商品ではありません。"
    },
    nav: {
      how: "仕組み",
      output: "アウトプット",
      trust: "信頼",
      faq: "FAQ",
      cta: "順番待ち"
    },
    hero: {
      headline: "保険会社の視点で整える保険準備レポート",
      subheadline: "Srebiは事故データを保険会社スタイルのレポートに整理し、参考提出と社内レビューを支援します。",
      disclaimer: "Srebiは保険商品ではなく、判断や補償決定を行いません。",
      primaryCta: "順番待ち",
      secondaryCta: "デモ依頼"
    },
    how: {
      title: "仕組み",
      steps: [
        {
          title: "アップロード",
          description: "証拠、ログ、事故メモを取り込みます。構造化・非構造化の両方に対応。"
        },
        {
          title: "自動タイムライン",
          description: "重要イベントを整理し、証拠リンクを文脈付きで接続します。"
        },
        {
          title: "保険会社スタイルのレポート",
          description: "レビューと参考提出を支える保険会社スタイルの事故レポートを生成。"
        }
      ]
    },
    output: {
      title: "理解しやすいアウトプット",
      cards: [
        {
          title: "タイムライン",
          points: ["時系列の再構成", "重要影響区間", "監査対応フォーマット"]
        },
        {
          title: "証拠リンク",
          points: ["元データを保持", "出所の明示", "保険会社提出の参考に"]
        },
        {
          title: "予防チェックリスト",
          points: ["根本原因の兆候", "ポリシー改善", "リスク準備アクション"]
        }
      ]
    },
    trust: {
      title: "信頼と透明性",
      points: [
        "Srebiは保険商品ではなく、責任や補償の判断を行いません。",
        "最終判断は保険会社、法務、関係者が行います。",
        "機密データは匿名化または除外を依頼できます。",
        "保持設定を管理でき、削除のリクエストが可能です。"
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "保険ですか？",
          a: "いいえ。Srebiは保険会社スタイルのレポートで事故レビューを支援するツールです。"
        },
        {
          q: "保険会社に提出できますか？",
          a: "はい。参考資料として提出できます。"
        },
        {
          q: "法的効力はありますか？",
          a: "Srebiのアウトプットは参考情報であり、最終判断は関係者が行います。"
        },
        {
          q: "どんなデータが必要ですか？",
          a: "事故メモ、ログ、コミュニケーション記録、証拠ファイルなど、必要なものだけ。"
        },
        {
          q: "データはどう使われますか？",
          a: "レポート生成と事故レビュー支援にのみ使用され、保険判断には使われません。"
        },
        {
          q: "分析にはどれくらいかかりますか？",
          a: "通常は数時間で完了し、データ量により変動します。"
        }
      ]
    },
    waitlist: {
      title: "順番待ちに登録",
      label: "仕事用メール",
      placeholder: "you@company.com",
      helper: "スパムは送信しません。Srebiの案内のみです。",
      success: "ありがとうございます。近日中にご連絡します。",
      submit: "順番待ち",
      requestDemo: "デモ依頼",
      invalidEmail: "正しいメールアドレスを入力してください。",
      error: "現在送信できません。hello@srebi.comにご連絡ください。"
    },
    incident: {
      cta: "事故を送信",
      title: "事故の送信",
      subtitle: "事故レコードを作成し、ファイルをアップロードします。保険判断ではなく保険会社スタイルのレポート向けです。",
      form: {
        title: "事故情報",
        description: "レポート整理のための任意項目です。",
        email: "連絡先メール",
        company: "会社/チーム",
        system: "システム種別",
        notes: "メモ",
        submit: "事故を作成",
        success: "事故を作成しました。以下からファイルをアップロードしてください。"
      },
      uploader: {
        title: "ファイルアップロード",
        description: "動画とログをアップロードできます。ファイルは安全なストレージへ直接送信されます。",
        videoLabel: "事故動画 (MP4)",
        logsLabel: "ログファイル (ZIP/JSON/LOG)",
        optional: "任意",
        chooseFile: "ファイルを選択",
        upload: "アップロード",
        uploading: "アップロード中...",
        uploaded: "アップロード済み",
        retry: "再試行",
        invalidType: "対応していないファイル形式です。",
        tooLarge: "ファイルが1GBを超えています。",
        genericError: "アップロードに失敗しました。もう一度お試しください。",
        maxSizeHint: "各ファイル最大1GB。安全なストレージに直接アップロード。",
        progress: "進行状況"
      },
      status: {
        title: "事故ステータス",
        subtitle: "チームと共有したり、後でアップロード済みファイルを確認できます。",
        fieldsTitle: "事故情報",
        filesTitle: "アップロード済みファイル",
        empty: "まだファイルがありません。",
        back: "送信に戻る",
        view: "事故ステータスを見る",
        uploadedAt: "アップロード",
        roleVideo: "動画",
        roleLogs: "ログ"
      }
    },
    footer: {
      contact: "連絡先",
      privacy: "プライバシー",
      terms: "利用規約",
      rights: "All rights reserved."
    },
    pages: {
      privacyTitle: "データとプライバシー",
      privacyBody: [
        "Srebiは提出されたデータのみを処理します。機密情報は匿名化または除外できます。",
        "データは保険会社スタイルのレポート生成と事故レビュー支援に利用されます。",
        "削除とエクスポートを依頼できます。情報を販売しません。"
      ],
      termsTitle: "利用規約",
      termsBody: [
        "Srebiは事故レポートツールであり、保険補償や判断を提供しません。",
        "提出データの正確性とレポートの利用はユーザーの責任です。",
        "最終判断は保険会社、法務、関係者が行います。"
      ]
    }
  }
};

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
