---
title: 앱을 현지화(번역)할 때 유의해야할 것들
tags:
  - ui-ux
  - frontend
datePublish: '2021-12-31T15:00:00.000Z'
---

[사람들이 앱을 번역할 때 알려주지 않는 것들 by eric w. bailey](https://ericwbailey.design/writing/what-they-dont-tell-you-when-you-translate-your-app/)을 참조하여 읽기 쉽게 정리했습니다. 앱을 현지화하고자할 때 사전에 준비해야할 점들입니다.

* 언어를 표기할 때 국가 깃발을 표기하지 말아라(언어≠국가)
* 언어마다 길이가 천양지차일 수 있다. 디자인에서부터 문자열 가변 길이가 고려 되어야 한다.

> 역주: "거래"는 한국어로 표현하면 2글자이지만, 영어로는 "transaction"(11글자)이 됩니다.

* 국가별로 특정한 도형이나 심벌이 갖는 뉘앙스가 완전히 다를 수 있다.
* 숙어는 잘 번역되지 않는다. 따라서 화면에서 숙어 사용을 자제해라.
* 디자인 단계에서 LTR(왼쪽->오른쪽)형태의 언어 뿐만 아니라 아랍어같이 RTL(오른쪽->왼쪽)형태의 언어에 대해서도 고려되어야 한다.

> 역주: BBC의 경우 언어에 따라 아예 사이트를 좌우 반전시켜 표현하기도 합니다. 아니면 좌-우 구분이 필요하지 않도록 가로보다 세로 위주의 디자인을 고려해볼 수 있을 것 같습니다.

* 디자인 단계에서 국가별로 색이 다른 뉘앙스를 가지고 있다는 점을 염두에 두고 디자인하여야 한다. (역주: 디자인을 살리기 위해서는 뉘앙스를 모두 반영하기는 어렵겠지만, 핵심 강조색에 대한 고려는 할 수 있을 듯 합니다.)
* 접속 기기의 IP주소나 지역을 통하여 언어를 분류하려고 하지 말아라.
* 다국어화를 고려한다면, 기본 디자인을 영어로부터 시작하는 것을 생각해볼 수 있다. 오늘날의 웹 경험에서 일반적으로 다른 언어의 번역 질이 떨어지는 경우가 다반사다. 때문에 모국어가 영어가 아닌 경우에도 공식 사이트 접속시 번역된 다른 언어 대신 영어를 택하는 경우가 생각 외로 많다.
* 사업 단계에서 번역은 한 번 하고나서 끝나는 것이 아니고, 기능이 업데이트될 때마다 번역도 새롭게 이루어져야함을 명심하여 적정한 번역 코스트를 찾아야 한다.
* 많이 간과하는 부분이지만, 시각장애인용 스크린리더를 통해서 볼 때의 번역은 경험이 또 완전히 다르기 때문에 미리미리 확인해야한다.
* 유료재화나 서비스등 법적인 고지와 일치해야만 하는 부분이 있어서 번역하기 어려운 부분이 있을 수 있다. 이점을 반드시 명심해서 인하우스 법률자문이 없다면 미리 법률자문을 확보하고 번역하는 것이 좋다.
* 사용하고 있는 서체가 다국어 지원을 제대로 하는지를 먼저 확인해라. 그렇지 않다면 스타일을 통해서 언어에 따라 다른 서체를 표기하도록 처리해야 한다.

> 역주: 이 경우 디자인 단계에서 모든 서체에 대해 다국어가 지원되는 보조 서체를 지정해두어야 합니다.

* 언어 메뉴를 아이콘으로 나타낼 생각을 하지 마라. 언어 메뉴를 어떤 아이콘으로 표기할지에 대해서 정확한 합의가 이루어진 적이 없다. 굳이 아이콘을 써야겠다면, 반드시 아이콘 근처에 라벨을 달아라.
* 번역이 잘못되었을 경우 사이트 전체의 신뢰도에 악영향을 끼칠 수 있다.
* 번역은 보통 개발 조직 자체의 변화를 필요로 하는 경우가 많다.

> 역주: 앞서 언급한 법률자문, 디자인 그리고 상주하는 번역팀 등을 통틀어서 말하는 내용인듯 합니다
