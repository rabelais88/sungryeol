import { NavigationGuardWithThis } from "vue-router";

const routerGuard: NavigationGuardWithThis<undefined> = (to, from, next) => {
  next();
};

export default routerGuard;
