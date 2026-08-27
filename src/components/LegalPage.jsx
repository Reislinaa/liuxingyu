export default function LegalPage({ type, onBack }) {
  const isPrivacy = type === 'privacy'

  const sections = isPrivacy ? [
    {
      title: '一、我们收集的信息',
      items: [
        '账号信息：注册时您提供的用户名、邮箱等基本信息。',
        '使用数据：您在使用在线体验功能时提交的文本内容，用于提供 AI 服务。',
        '设备信息：浏览器类型、操作系统等基本设备信息，用于优化服务体验。'
      ]
    },
    {
      title: '二、信息的使用',
      items: [
        '为您提供 AI 智能补全、改写、翻译等核心功能。',
        '持续优化和改进我们的 AI 模型与服务。',
        '在获得您同意的前提下，向您推送产品更新信息。'
      ]
    },
    {
      title: '三、信息的保护',
      items: [
        '我们采用行业标准的加密技术保护您的数据传输安全。',
        '您的输入内容不会被出售或出租给任何第三方。',
        '我们仅在法律要求或获得您明确授权的情况下共享必要信息。'
      ]
    },
    {
      title: '四、您的权利',
      items: [
        '您可以随时访问、更正或删除您的个人信息。',
        '您可以随时注销账号，注销后相关信息将被删除。',
        '您可以通过邮箱联系我们行使以上权利。'
      ]
    }
  ] : [
    {
      title: '一、服务说明',
      items: [
        'AI 智能输入法为用户提供在线 AI 文本补全、改写、翻译等智能输入服务。',
        '使用本服务即表示您同意本条款的全部内容。',
        '我们有权根据运营需要调整或升级服务内容。'
      ]
    },
    {
      title: '二、用户行为规范',
      items: [
        '不得利用本服务从事任何违法违规活动。',
        '不得上传或生成侵犯他人知识产权、隐私权的内容。',
        '不得对本服务进行逆向工程、恶意攻击或干扰。',
        '不得利用本服务生成传播虚假、有害信息。'
      ]
    },
    {
      title: '三、知识产权',
      items: [
        '本网站的设计、代码、LOGO 等知识产权归我们所有。',
        '用户上传的内容版权归用户所有，但授予我们必要的使用许可。'
      ]
    },
    {
      title: '四、免责声明',
      items: [
        'AI 生成内容仅供参考，不构成任何专业建议。',
        '因不可抗力导致的服务中断，我们不承担相关责任。',
        '本条款的最终解释权归 AI 智能输入法所有。'
      ]
    }
  ]

  return (
    <div className="legal-page">
      <div className="legal-header">
        <div className="container">
          <button className="legal-back" onClick={onBack}>← 返回首页</button>
          <h1>{isPrivacy ? '隐私政策' : '服务条款'}</h1>
          <p>最近更新：2026 年 8 月 26 日</p>
        </div>
      </div>
      <div className="container legal-body">
        <div className="legal-card">
          <p className="legal-intro">
            {isPrivacy
              ? '我们深知个人信息对您的重要性，并将按照法律法规要求，采取相应安全保护措施，尽力保护您的个人信息安全可控。请在使用我们的产品（或服务）前，仔细阅读并了解本《隐私政策》。'
              : '欢迎使用 AI 智能输入法。在使用本服务前，请仔细阅读以下服务条款。您开始使用本服务即视为您已阅读并同意接受本条款的约束。'}
          </p>
          {sections.map((s, i) => (
            <div className="legal-section" key={i}>
              <h2>{s.title}</h2>
              {s.items.map((item, j) => (
                <p key={j}>{item}</p>
              ))}
            </div>
          ))}
          <div className="legal-contact">
            <h2>联系我们</h2>
            <p>如有任何关于本{isPrivacy ? '隐私政策' : '服务条款'}的问题，欢迎通过以下方式联系我们：</p>
            <p>邮箱：support@ai-im.cn</p>
          </div>
        </div>
      </div>
    </div>
  )
}
