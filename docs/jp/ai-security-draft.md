# Security Part

サイバー セキュリティの目的は、組織に対して発生するサイバー セキュリティ上のリスクを把握し、許容可能なレベルに管理することです。

サイバーセキュリティは人、組織のプロセス、システムの実装を包括的にカバーする必要がありますが、サイバーセキュリティのエリアでは様々な組織によって管理、実証されている基準やフレームワークが存在し、適切なものを選択することで、適切なコストで抜け漏れの少ないサイバーセキュリティを実現することができます。

ここでは [Cyber Security Framework](https://www.nist.gov/cyberframework) に従って、フレームワークで提供される機能の一部を拾いながら AI/ML システムで考慮すべきリスクと対処の方針を解説します。

## Cyber Security Framework

[Cyber Security Framework](https://www.nist.gov/cyberframework) は [NIST](https://www.nist.gov/) によって管理されている、組織がサイバー セキュリティを継続的かつ体系的に管理するためのフレームワークで、組織のセキュリティ機能を識別、防御、検知、対応、復旧の ５ つに分類します。

![Cyber Security Framework](https://www.nist.gov/sites/default/files/styles/220_x_220_limit/public/images/2019/10/18/framework_functions_wheel.png?itok=1KLGPsFQ)

- 識別 (Identify) : ビジネス環境、資産、脅威を識別し、リスクを把握する。
- 防御 (Protection): 特定されたリスクに対して適切な保護策を検討し、実施する。
- 検知 (Detect) : サイバー セキュリティ イベントの発生を検出する。
- 対応 (Respond) : 検知されたサイバーセキュリティ インシデントに対処する。
- 復旧 (Recover) : サイバー セキュリティ インシデントによって阻害された機能やサービスを復旧する。

フレームワークの機能は識別から開始され、まず組織の資産と資産に対する脅威が識別されるため、新しいテクノロジーを導入する際にもリスクを検討することができます。また、識別された脅威に対してセキュリティ対策を検討することになるため、リスク ベースのアプローチとなり、実際に組織にとって必要なセキュリティ対策が実装されやすいという特徴があります。

フレームワークは CIS CRC、ISO 27001 (ISMS)、NIST SP800-53 などの重要なセキュリティ基準を参照しています。これによりフレームワークの信頼性を説明することが可能になり、またこれらの基準とフレームワークを併用することを容易にしています。フレームワークのカテゴリー自体は包括的でありながらも項目の数はコンパクトであり、小規模な組織でも管理しやすいものになっています。

## 識別 (Identify)

識別では組織のビジネス環境や所有する資産、内部および外部の脅威、関連するサプライチェーンなどを識別します。リスクの可能性は脅威の存在に対して存在するため、脅威を把握することで管理されていないリスクを減らすことができます。

### 脅威の特定

サイバー セキュリティの目的は、組織に対して発生するサイバー セキュリティ上のリスクを把握し、許容可能なレベルに管理することです。リスクの可能性は脅威に対して存在するため、脅威を把握することで管理されていないリスクを減らすことができます。

この脅威を識別する取り組みは脅威モデリングと呼ばれますが、AI/ML システムでは従来の脅威に加えてさらに深く議論すべき課題があると考えられています。

#### 従来の脅威

組織のAI/ML システムシステムは、既存のインフラストラクチャの一部として動作するため、従来のシステムに対して発生する脅威は、AI/ML システムにおいても考慮されている必要があります。

システムが満たすべきセキュリティ要件は機密性、完全性、可用性という 3 つの要素として整理されます。

サイバー セキュリティの基本 3 要素

- 機密性 (Confidentiality) : 権限のある主体だけが情報を読み取ることができること
- 完全性 (Integrity) : 権限のある主体だけが情報を変更することができること
- 可用性 (Availability) : 情報が必要なときに利用できること

より詳細な議論のために、この他に真正性(Authenticity)、信頼性(Reliability)、責任追跡性(Accountability) 、否認防止（non-repudiation）という 4 要素が追加されることもあります。

これらのセキュリティ要素を侵害するものがサイバー セキュリティ上の脅威です。特定のシステムに対して想定される脅威を識別する取り組みを脅威モデリングと呼びます。サイバー セキュリティ上の脅威はデータの入出力に対して発生するため、システムのコンポーネント間のデータフローを記述し、識別されたデータの入出力に対して脅威の分析を行います。  
組織が管理していないコンポーネントから組織が管理しているコンポ―ネントに対するデータの入出力があったり、組織の管理しているコンポーネントでもセキュリティ レベルの異なるコンポーネント間のやりとりは信頼の境界を跨ぐデータの入出力になるため、注意深く脅威を識別する必要があります。

[脅威モデリングの概要](https://learn.microsoft.com/ja-jp/training/modules/tm-introduction-to-threat-modeling/)

また、攻撃者が使用する既知のテクニックは TTP というナレッジベースで管理されており、広く利用されているものとしては [MITRE ATT&CK®](https://attack.mitre.org/) があります。攻撃のフェーズに応じたテクニックが整理されており、脅威シナリオを想定したり、技術的な実装を検討する際に役立てることができます。

#### 障害モード (AI/ML システムの脅威)

AI/ML システムで考慮すべき新しいリスクは [機械学習の障害モード](https://learn.microsoft.com/ja-jp/security/engineering/failure-modes-in-machine-learning) にまとめられています。

このドキュメントではAI/ML システムに発生する問題を意図的な障害と意図的ではない障害の２ つに分類し整理を行っています。

意図的な障害はアクティブな敵対者によって引き起こされる障害で、機密性、完全性、可用性を脅かす可能性のある脅威と考えることができます。Azure Open AI で既存のモデルを使用する場合、学習データやモデルの管理はプラットフォーム側の管理になりますが、ファインチューニングを行う際の学習データや、クエリの問い合わせを行う際に他のデータベースと連携するような場合には、これらの脅威によって発生する新たなリスクを考慮する必要があります。

意図的ではない障害は ML が意図した動作を行わないことによって発生します。従来のシステムでも意図しない動作が行われることはありましたが、これは意図に対して適切ではないプログラムが与えられることが原因であり、プログラムのバグとして意図した動作を行うように修正することが可能でした。

AI/ML システムでは一般的に入力に対する出力を完全に予測したり、問題の原因を完全に特定することが困難です。このため、AI/ML システムに依存するシステムでは意図しない動作が発生することを従来のシステムより高い確率で見込まなければなりません。このため、従来のシステムで好まれているリスクを移転、回避するというアプローチの他にも、リスクの低減と保有を強く意識するシナリオが増えます。

意図的な障害を脅威として解釈し、整理して対応する際の指針が次のドキュメントで解説されています。

[AI/ML システムと依存関係の脅威のモデル化](https://learn.microsoft.com/ja-jp/security/engineering/threat-modeling-aiml)

AI/ML システムを脅威モデリングする際に新しく導入すべき観点は次の 3 つです。

- セキュリティ境界ではトレーニング データを含める必要がある  
  関連する脅威：
  - 敵対的摂動 (すべてのバリエーション)
  - データのポイズニング

- オンラインまたは物理的な領域でお客様に損害を与える可能性のある、モデルまたは製品・サービスの行動を特定する必要がある  
  関連する脅威：
  - メンバーシップの推論
  - モデルの反転
  - モデルの盗難

- AI/ML システムが依存するライブラリやデータ、AI/ML を使用するサードパーティを特定する必要がある
  関連する脅威：  
  - ニューラル ネットワークの再プログラミング
  - 物理ドメインにおける敵対的な例
  - 悪意ある ML プロバイダーによるトレーニング データの復旧
  - ML サプライ チェーンへの攻撃
  - モデルに対するバックドア攻撃
  - ML 固有の依存関係の侵害

## 防御の実装

防御では認証と認可に基づく適切なアクセス制御、ネットワークのセグメンテーション、暗号化など、脅威に対するセキュリティ対策を導入します。脅威に対処ができていない状態は脆弱性と呼ばれます。アプリケーションは様々なコンポーネントによって構成されるため、防御にはそれぞれのコンポーネントに対して考えられる脅威と、それぞれのコンポーネントで構成可能な実装のオプションに関する知識が必要になります。

### セキュリティ態勢管理

Azure ではプラットフォームの機能としてクラウドセキュリティ態勢管理 (CSPM) 機能が提供されます。リソースのセキュリティ設定はプラットフォームで自動的に計測され、脆弱な構成を発見することができます。セキュリティ状態はセキュア スコアとして数値で表示されるため、セキュリティ運用や開発プロセスで KPI のひとつとして利用することができます。

![Secure Score](https://learn.microsoft.com/ja-jp/azure/defender-for-cloud/media/secure-score-security-controls/security-controls.png#lightbox)

<!-- @Scale で導入すべきセキュリティ設定を列挙する-->

### Microsfot Cloud Security Benchmark

CSPM 機能が基準とするセキュリティ設定は [Microsoft Cloud Security Benchmark](https://learn.microsoft.com/ja-jp/security/benchmark/azure/) に基づいています。Microsoft Cloud Security Benchmark は組織が実装すべきセキュリティ コントロールを次の 12 種類に分類し、ガイダンスを提供しています。

- ネットワーク
- ID 管理
- 特権アクセス
- データ保護
- アセット管理
- ログと脅威検出
- インシデント対応
- 体制と脆弱性の管理
- エンドポイントのセキュリティ
- バックアップと回復
- DevOps セキュリティ
- ガバナンスと戦略

ドキュメントではセキュリティ ベースラインという項目で、 Azure の各リソースで考慮すべきセキュリティ コントロールと、実装のガイダンスを提供しています。このガイダンスのなかでプラットフォームが自動的に測定できるものが CSPM 機能によって自動的に測定され、セキュアスコアが計算されます。

セキュリティ ベースラインは継続的に更新されていますが、AI/ML システムのコンポーネントでは個別のセキュリティ ベースラインが利用できない場合があります。その際には Microsoft Cloud Security Benchmark を参照し、コンポーネントが考慮すべきセキュリティ コントロールを特定し、ガイドラインを参照することで、他のコンポーネントと整合するセキュリティレベルを保つことができます。

### AI/ML システムに対する保護

- セキュリティ境界ではトレーニング データを含める必要がある  
  関連する脅威：
  - 敵対的摂動 (すべてのバリエーション)  
    **[検知]での対応**
  - ~~データのポイズニング  ~~

- オンラインまたは物理的な領域でお客様に損害を与える可能性のある、モデルまたは製品・サービスの行動を特定する必要がある  
  関連する脅威：
  - ~~メンバーシップの推論~~
    **[検知]での対応**
  - ~~モデルの反転~~
  - ~~モデルの盗難~~

- AI/ML システムが依存するライブラリやデータ、AI/ML を使用するサードパーティを特定する必要がある
  関連する脅威：  
  - ~~ニューラル ネットワークの再プログラミング~~
  - 物理ドメインにおける敵対的な例
  - ~~悪意ある ML プロバイダーによるトレーニング データの復旧~~
  - ML サプライ チェーンへの攻撃
    脆弱性評価ソリューションを使用する  
  - モデルに対するバックドア攻撃
    **[検知]での対応**
  - ML 固有の依存関係の侵害  
    脆弱性評価ソリューションを使用する  

### ログとバックアップ

Cyber Security Framework の防御機能にはバックアップと監査ログの管理が含まれています。AI/ML システムは通常の手続き型言語で開発されたシステムに比べてコントロールが難しく、意図しない動作が、より高い頻度で発生することを織り込む必要があります。問題が発生した際に調査を行うことができること、また複数のモデルやデータを併用する場合に、意図しない結果がどののモデルやデータから発生したものかを特定する必要がある可能性を考慮してください。

最初に検討すべきログとバックアップ：

- ユーザー ディレクトリの認証ログ
- Azure の監査ログ (Azure Activity)
- AI/ML システムに対するリクエストとレスポンスのログ
- 問題発生時の環境を再現するためのデータ
  - モデルのバージョン
  - アプリケーション コード
  - モデルを生成したデータ

## 検知の実装

脅威を検知するために必要なログを収集し、検知を行うための分析を実施する

AI/ML システムの脅威はアクセス制御を越えて発生するため、完全に防御することはできないので検知を成熟させていく必要がある。

意図的な障害については（半数くらい？）検出することができる。ファインチューニングをする場合はユーザーの責任になる資産が発生するため力を入れるべき。
例えばモデルの移転やメンバーシップ推論攻撃をしようとすると、似たようなクエリが（複数のユーザーを跨ぐ場合もある）連続して発生する。
プロンプト インジェクションも似たような傾向になることが想像できる。

- ログの実装
  - 標準的なログ
  - AI のログ

意図的でない障害は「ユーザーからの通知」で見つけることができる可能性があるので、報告用の UI が用意されていると良い。

Audit Logs
Request and Response Logs
Trace Logs
AllMetrics

- 想定する脅威

- セキュリティ境界ではトレーニング データを含める必要がある  
  関連する脅威：
  - 敵対的摂動 (すべてのバリエーション)  
    **[検知]での対応**

- オンラインまたは物理的な領域でお客様に損害を与える可能性のある、モデルまたは製品・サービスの行動を特定する必要がある  
  関連する脅威：
  - メンバーシップの推論
    **[検知]での対応**

- AI/ML システムが依存するライブラリやデータ、AI/ML を使用するサードパーティを特定する必要がある。
  関連する脅威：  

  - モデルに対するバックドア攻撃
    **[検知]での対応**

## 対応の実装

- 対応プロセスを準備しておくことは大事
  - 障害モードを検知した場合
  - サービスの停止も考慮する

問題のある出力は出力がユーザーにわたる前にブロックしなければならないのか
検知と修正は対応後でも良いのか