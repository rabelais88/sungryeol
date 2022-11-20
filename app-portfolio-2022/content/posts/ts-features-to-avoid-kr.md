---
title: 사용을 자제하면 좋은 타입스크립트 기능들
tags:
  - frontend
  - typescript
datePublish: '2022-02-06T15:00:00.000Z'
---

* [사용을 자제하면 좋은 타입스크립트 기능들(원문: 영어)](https://www.executeprogram.com/blog/typescript-features-to-avoid "") 에서 핵심적인 내용만 간추려 보았습니다.

# enum 사용을 자제하자

```typescript
// 🚫 사용을 자제해야할 방식
enum MyValues {
  A = 'A',
  B = 'B'
}
type MyValue = MyValues | string;
// ✅ 권장하는 방식
type MyValues = 'A' | 'B' | string;
```

* 위의 코드에서 알 수 있듯이 `enum` 외에 여러 타입이 혼재(union)되어있을 경우 사용하지 않고 일반 타입선언을 하는 편이 훨씬 간단하다.
* `enum`을 사용한다고 해서 더 유지보수 편의성이 딱히 더 개선되지 않는다.
* `enum`은 각종 트랜스파일러(i.g. 바벨) 및 관련 플러그인과 충돌할 확률이 크다:
  일반적인 타입스크립트의 트랜스파일링은 아래와 같은 방식으로 이루어진다. 즉 중간에 타입스크립트 코드를 걷어내고(strip) 자바스크립트 코드만 남겨놓은 상태로 트랜스파일링을 하게된다.
  원래 자바스크립트 코드에 다른 코드를 더하는 것이 타입스크립트의 일반적인 방식이라면, `enum`을 사용하는 방식은 일반적인 자바스크립트의 변수를 사용하는 방법과 완전히 똑같기 때문에 여러 트랜스파일러 또는 플러그인을 거치다 보면 에러가 발생할 확률이 크다.

<callout>타입스크립트 코드 > TS:타입 체크 > TS:타입스크립트 코드 벗겨내기(strip) > 써드파티 트랜스파일러 통과</callout>

```typescript
// 일반적인 자바스크립트 변수 사용
const MyValues = { a: 'a' }
const myVal = MyValues.a;
// 타입스크립트의 enum 사용
const myVal = MyValues.a;
```

# namespace사용을 자제하자

* `enum`과 유사한 케이스. `namespace`는 자바스크립트에서 기본적으로 전역 범위 함수가 된다. 따라서 같은 이름의 함수나 namespace가 있으면 충돌할 수 있다. 만약 사용하고 있는 두 개 이상의 라이브러리에서 같은 namespace를 사용할 경우 에러를 피할 수 없다. 직접 우회를 선언하면 되지만 매우 번거롭다.
* 실제 `react-three-fiber` 와 `chakra-ui` 및 `material-ui`가 [충돌한 사례](https://stackoverflow.com/questions/68692230/ts-expression-produces-a-union-type-that-is-too-complex-to-represent-with-materi "") 가 있다.

```typescript
// 아래와 같이 다른 라이브러리의 namespace가 일치할 경우 충돌할 수 있다.
// node_modules/lib-a
namespace MyGlobal {
 // ...
}

// node_modules/lib-b
namespace MyGlobal {
  // ...
}
```

# decorator 및 private 사용을 자제하자

* 둘 모두 `enum`과 유사한 케이스로, 해당 기능들이 ECMAscript 혹은 최신버전의 자바스크립트에서 자바스크립트에 구현될 예정이거나 이미 구현되었기 때문에 문제가 되고 있다.
* `@` decorator의 경우 자바스크립트 기능에 추가가 예정된 반면 아직 [건의](https://github.com/tc39/proposal-decorators "") 단계를 통과하지 못했다. 나중에 자바스크립트에서 형태가 바뀔 가능성이 있다고 봐야 한다. 언젠가 이에 맞추어 타입스크립트 코드를 수정해야 트랜스파일러의 오동작을 막을 수 있다. 번거로운 작업이 될 확률이 높다.
* `private`의 경우 자바스크립트에 같은 기능을 하는  `#` [접근자가 추가되었다](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields ""). 따라서 굳이 타입스크립트에서만 지원하는 `private`를 쓰는 것 보다는 `#`를 쓰는 편이 나중에 불필요한 코드 수정을 막을 수 있다.

```typescript
class MyClass {
  // 🚫 사용을 자제해야할 방식
  private myProperty: MyType;
  // ✅ 권장하는 방식
  #myProperty: myType;
}
```
