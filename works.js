/*
 * Oiro Lab - 作品データ
 *
 * 作品を追加するときは、下の「window.OIRO_WORKS」の配列に「{ ... }」を1件足すだけです。
 * 各項目の意味は README.md の「作品の追加・編集」を確認！
 *
 * platform : "android" | "windows" | "extension"
 * status   : "released"(公開中) | "developing"(開発中) | "planned"(開発予定)
 */
(function () {
  var GP = "https://play-lh.googleusercontent.com/";

  window.OIRO_WORKS = [
    /*---- Androidアプリ ----*/
    {
      id: "tomoshibi-sort",
      name: "ともしびソート",
      platform: "android",
      status: "released",
      kind: "パズルゲーム",
      summary: "夜空の星を指でなぞって囲み、同じ色の箱に集めて星座を完成させる、片手で遊べるパズル。",
      tags: ["パズル", "ゲーム", "星座", "星", "片手", "暇つぶし", "無料"],
      description: [
        "夜空から降ってくる星を指でなぞって囲み、同じ色の箱に集めていく、一本指のパズルゲームです。",
        "星を囲むたびに星座の星がひとつずつ灯り、すべて灯せばステージクリア。ステージが進むほど星の数や色が増え、動きも速くなります。"
      ],
      features: [
        "縦画面で、片手・一本指でも遊べるシンプルな操作",
        "引いた線がロープになり、星をはじいたり押し戻したりできる",
        "星座を完成させるステージモードと、記録に挑むエンドレスモード",
        "一度にたくさん集められる星、動きがゆっくりになる星などの特殊な星",
        "広く囲むほど高得点。連続成功でコンボがのびる",
        "遊んで貯めたコインで、星・線・箱の見た目を変更できる",
        "雰囲気の違うBGMを5曲収録(設定で選択)",
        "日本語・英語に対応"
      ],
      notes: [
        "広告について: 数ステージごとに短い全画面広告が表示されます。結果画面で動画広告を見ると、獲得コインが2倍になります(視聴は任意です)。"
      ],
      price: "無料(広告あり)",
      released: "2026-11-21",
      updated: "2026-11-21",
      icon: GP + "jmb4-JvwLsKFRRwmYABg8OAQKfcUNUNbOgEXUHQjfkJ-3JoBsNRqicpafSA2ljGCOEd76FuR71kAioPW-mwDHg",
      screenshots: [
        GP + "_hZcucHediP_lh5OkBHMP71ERXwVPF3RAm2dwd1mooTnFIhtDSetUnm_jIleGpavX1sd1p5Pq5q0oDp4coEQuA",
        GP + "VerIUk46K_vRaBDgOYvaYxgfkNkevOWgHJ6oIR3PMHNA2SYBxLj84Fm5KUImCPR5XtodNsa8jmZpe1Jv98MxoQ",
        GP + "iqpkqi90LZqM8oVkgi9nmHET7z-50ktwcsz7881ufKk9UBb2SsdOQY8IQnled-7WwkHi9HQFR98dCIELhxOM2FY",
        GP + "k8k4FSMAFqvozdq_ngCfaVhBnukzOy-53FAdcobQHQKb_Fl2Ip_0Cn6BXM234GwThWhlgfXpPNAZpVOFDNm6Xw",
        GP + "gNnzcK1DcW8pE8w7EQk_YSG_oC0BCUtKZMYQWK98kTk0MOnB_x3nnJT4REHBHR-XlJYnnWeihoZOEZziPmo3",
        GP + "cygd16E6VtOBlyOhCFalz52zchknIYzBht16wXO_-guZ3oIUupbQoyrjf0HPJ7_MGAKvNc-jhJmbsN8h2fZVSLA"
      ],
      links: [
        { label: "Google Playで見る", url: "https://play.google.com/store/apps/details?id=com.made_by_oro.s_tomoshibisort", kind: "store" },
        { label: "プライバシーポリシー", url: "https://doc-hosting.flycricket.io/tomoshibiso-to-puraibashi-porishi/794d4cb9-7839-4416-8865-c4d131269dcd/privacy", kind: "privacy" }
      ],
      history: [
        { date: "2026-11-21", text: "製品版をリリース" },
        { date: "2026-11-15", text: "アプリの最適化(容量削減)" },
        { date: "2026-11-08", text: "チュートリアルを追加" }
      ]
    },
    {
      id: "bank-card-memo",
      name: "銀行口座＆カード管理アプリ",
      platform: "android",
      status: "released",
      kind: "ファイナンス",
      summary: "銀行口座とカード情報をひとつにまとめて管理。長押しで番号をすぐコピーできます。",
      tags: ["銀行", "口座", "カード", "クレジットカード", "管理", "メモ", "コピー", "家計", "無料"],
      description: [
        "銀行口座やカードの情報を、ひとつのアプリにまとめて管理するメモアプリです。振込やネットショッピングのときに、必要な番号をすばやく取り出せます。"
      ],
      features: [
        "項目を長押しするだけで、口座番号・カード番号・セキュリティコードをクリップボードにコピー",
        "銀行は「銀行名・支店名・支店コード・口座番号」、カードは「カード名・番号・有効期限・セキュリティコード」を管理",
        "カード番号の入力だけで、ブランド(Visa / Master / JCB / AMEX など)を自動判別",
        "よく使う口座・カードを星マークでお気に入り登録し、起動後すぐに一覧表示",
        "ライト・ダークに加え、夕日や浜辺などのテーマで見た目を変更"
      ],
      notes: [
        "入力したデータは端末内のデータベースにのみ保存され、外部のサーバーには送信されません。",
        "広告が表示されます。"
      ],
      price: "無料(広告あり)",
      released: "2026-09-05",
      updated: "2026-10-25",
      icon: GP + "ZrZDu9C4OC3RkIBqyEypnFbcKJj5MtpHWZNxfthgGYSkWzP9WQz3255zVIg_99he0pZ9zGn76biL5Tafeblnu2g",
      screenshots: [
        GP + "JcO8H5Vl9_JZ-wlQUegCXStzlBkPm9eLsFU4zsBv6gJBFdFv8uSXgOGBT2sPB2AhHrzFqbRMgSrOET5_T2WD",
        GP + "Swol7hG7shXT6ALxgoK903SUySSXdnFASuVUEsBfghZiwx-dNolnqZalPY6BJECl6CQM55Md0oFDWBAEVU-G4g",
        GP + "2aY1SFzmUxrTfgmU0ItC2LomLglgJJeQ4aOf5yFGCJXIy6Njosk8ls10ZSm_GhutCdEpTsrgHOWJCK2u3XAp1h4",
        GP + "XAq75dTwqsYu_l7oPHv7g1DtU-ZU-Qqs-KNSO1d1YiFUDU39O2MpWYAqOkTW7fN_h9dBZGqP4TmZ0NlIKbM4QDM",
        GP + "RR5ttJzKHStc43VxYqnYNGvWuaoCRtc-9vOTLWhYh-LMDr69vbBz6pllGzdSp2hIgH9xkxyw4SI3jgolBpizz1o",
        GP + "iNJpCKBNiprQ1YDGtDU7l471PkcXJtcnfzkwML085-JsnspnQVvNioqWzgBbpILabIB26iv7Mj4LNfzmU8ReIw"
      ],
      links: [
        { label: "Google Playで見る", url: "https://play.google.com/store/apps/details?id=com.made_by_oiro_04_bank_and_card_management", kind: "store" },
        { label: "プライバシーポリシー", url: "https://doc-hosting.flycricket.io/yin-xing-kou-zuo-ka-doguan-li-apuri-puraibashi-porishi/08bf8736-e65f-423c-a7b3-0231976238b5/privacy", kind: "privacy" }
      ],
      history: [
        { date: "2026-10-25", text: "浜辺テーマ時の表示モードを調整、起動時のモード関連の不具合を修正" },
        { date: "2026-10-23", text: "お気に入り画面のUIを更新、お気に入り登録処理の不具合を修正" },
        { date: "2026-09-29", text: "起動・クラッシュに関する不具合を修正、テーマに合わせてツールバーの色も変更" },
        { date: "2026-09-05", text: "製品版をリリース" }
      ]
    },
    {
      id: "study-timer",
      name: "学習タイマー(消音・ポモドーロ対応)",
      platform: "android",
      status: "released",
      kind: "仕事効率化",
      summary: "図書館や自習室でも使える、消音・ライト・バイブ通知対応の学習タイマー。ポモドーロにも対応。",
      tags: ["タイマー", "学習", "勉強", "ポモドーロ", "消音", "図書館", "自習室", "バイブ", "集中", "受験", "資格", "無料"],
      description: [
        "音が気になる図書館・自習室・カフェ・学校・職場などでも、安心して使える学習タイマーです。",
        "受験や資格試験の勉強はもちろん、仕事や読書の時間管理にも使えます。"
      ],
      features: [
        "通知の音・バイブ・画面の点灯を、自由に組み合わせて設定できる",
        "集中と休憩の時間を管理するポモドーロタイマー",
        "よく使う時間を3件まで保存できるプリセット機能",
        "端末内の音声ファイルを通知音に設定可能",
        "複数のテーマを用意。ダークモードにも対応",
        "アプリを閉じていても、通知バーで残り時間を確認できる",
        "最大42時間までセット可能"
      ],
      notes: [
        "広告が表示されます。"
      ],
      price: "無料(広告あり)",
      released: "2026-07-26",
      updated: "2026-09-07",
      icon: GP + "3v-wbN1us18T2Y7PDCpT-ScX80DM1UVnMecneauRv0s1sm-bgIJ-QMf16P0xmmFfiXbdiUEWxQ9h8Mt_Y28p",
      screenshots: [
        GP + "P7BZVLd1I35AWdq2kZcsertGqvwWHUIL7fDoksqygRc6a9VyyowFKOUivT6UA4nkTjB34hRilwAJ0feBwREv",
        GP + "gYmDW1PZZZAM15vU6wGHgmTk0q7U7-ab30fnSSwfmcf3Pijf9nfGucCGOipjAufUfwbHwWhRxF6o9CeIvxjOBQ",
        GP + "JK4qnEpRODN82Y4z6WBwpCvRUJvERtjgTfcUWepbJ9givz_bPsqC6dTl_aloDUxp6YMdzFKo0N5Uy5Z9oZCLmxU",
        GP + "oUukLYJTxOKHA1TBnXiQTgw47TUTVoXWd32MYW-Zr1SKljodAwvhuanA1k5SXpposy1P5pOng9ITrHuQbYm3AQ",
        GP + "heYHRlKW_8expFMGmUK_Bbk1_lWC6E6K-NXH_bXD8BwiZDLvAz-qAaMyuOSSFMFrvMrdkgiuiFpjSF_w5DbC",
        GP + "35rz6bSd90gPbzE1yPLMMiIQJI8QD31NYoDV642Nrdi3efn1KjEEpXnFbBvusDZeYaZumUnBvTsb47uDzM7ULGs",
        GP + "Z_4GO9IB2aj6fTczj9b4qFkyzy0OeolUW6zwxpVdBgzFNXj2TebSu0TSivyCbw66ymVYfmUPZoc3pOb1zQaSzFk",
        GP + "poqRokfxAQ_ArWxBngwaOvp0Hg0zZVkCAB5MPRVwI9VTMTH0CmGUJ4ib4DjI2opvHr9Od-K_2oWxBaEF9Qg5lg"
      ],
      links: [
        { label: "Google Playで見る", url: "https://play.google.com/store/apps/details?id=com.made_by_oiro_03_timer", kind: "store" },
        { label: "プライバシーポリシー", url: "https://doc-hosting.flycricket.io/xue-xi-yong-taima-xiao-yin-ji-neng-fu-ki-privacy-policy/6045b33d-c3da-46c1-94e0-f3a6d1d86b5a/privacy", kind: "privacy" }
      ],
      history: [
        { date: "2026-09-07", text: "タイマーの進捗バーを追加、edge-to-edgeへの対応方法を変更" },
        { date: "2026-08-17", text: "3ボタン方式でのレイアウト崩れ、ポモドーロのボタンレイアウト崩れを修正" },
        { date: "2026-07-26", text: "製品版をリリース" }
      ]
    },

    /*---- Windowsソフト(開発中) ----*/
    {
      id: "win-order-management",
      name: "受注管理ソフト(仮称)",
      platform: "windows",
      status: "developing",
      kind: "業務用",
      summary: "業務で使う受注管理ソフトを開発中です。",
      tags: ["Windows", "業務用", "業務", "受注管理", "受注", "仮称"],
      description: [
        "業務での利用を想定した、Windows向けの受注管理ソフトです。名称・機能・公開時期は検討中です。"
      ],
      features: [],
      links: []
    },
    {
      id: "win-voice-changer",
      name: "ボイスチェンジャー(仮称)",
      platform: "windows",
      status: "developing",
      kind: "一般用",
      summary: "自動調整機能つきの、一般向けボイスチェンジャーを開発中です。",
      tags: ["Windows", "一般用", "ボイスチェンジャー", "ボイチェン", "声", "音声", "自動調整", "仮称"],
      description: [
        "自動調整機能を備えた、Windows向けのボイスチェンジャーです。名称・機能・公開時期は検討中です。"
      ],
      features: [],
      links: []
    },

    /*---- 拡張機能(開発予定) ----*/
    {
      id: "extension-planned",
      name: "拡張機能(準備中)",
      platform: "extension",
      status: "planned",
      kind: "拡張機能",
      summary: "拡張機能を開発予定です。詳細は決まり次第お知らせします。",
      tags: ["拡張機能", "開発予定", "準備中"],
      description: [
        "拡張機能の開発を予定しています。内容や公開時期は検討中です。"
      ],
      features: [],
      links: []
    }
  ];
})();
