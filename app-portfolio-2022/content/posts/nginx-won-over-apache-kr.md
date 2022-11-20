---
title: nginx가 apache를 제치고 1위를 탈환하다
tags:
  - tech
datePublish: '2022-01-27T15:00:00.000Z'
---

![2021년부터 지금까지 shodan에서 집계된 내용](https://d3es8xowxikdnc.cloudfront.net/nginx_over_apache_rank_2022_fe42f1b311.jpg)

[해커뉴스](https://www.nginx.com/blog/do-svidaniya-igor-thank-you-for-nginx/)의 답글란을 읽다가 얻어온 소식입니다. [shodan](https://www.shodan.io/)에 따르면 2021년 1월에 nginx가 apache(이하 아파치)를 제치고 전세계에서 가장 인기있는 웹서버 어플리케이션 1위로 집계되었고 이 대세가 올해도 이어지고 있다고 하네요.

* [shodan 쿼리 페이지:아이디 및 구독 필요](https://trends.shodan.io/search?query=http+port%3A443#facet/product)

말이 좋아서 웹서버지 사실은 내부 네트워크에서 리버스 프록시 용도로 더 많이 쓰고 있는데, 이러한 프록시 용도로 전문화된 웹 서버중에서 nginx가 상당히 빠른 속도로 1위를 탈환한 것에 대해서 여러가지 썰이 오가고 있습니다.

* 아파치가 설정 파일이 복잡하다 -> 옵션이 복잡해서 잘 건드리지 않게 된다 -> 성능 튜닝에 대한 노하우가 적어진다 -> 퍼포먼스가 떨어져서 잘 안쓰게 된다
* [아파치가 쓰레드 기반(thread-based)인데 반해서 nginx가 이벤트 기반(event-based)이기 때문](https://aosabook.org/en/nginx.html)에 고가용성(High Availability)에 더욱 유리하기 때문
