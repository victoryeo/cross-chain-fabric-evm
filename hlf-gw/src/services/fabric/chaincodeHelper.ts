import * as ___ from 'underscore';

export function setupCCSelector(selector?: any): any {
  const payload: any = {

  };

  if (selector !== undefined) {
    console.log(`Passed selector is ${selector}`)
    payload.selector = selector;
    payload.bookmark = selector
    console.log(payload.selector)
    ___.mapObject(payload.selector, (val: string, key: string) => {
      switch (val) {
        case '$empty':
          payload.selector[key] = '';
          break;
        case '$true':
          payload.selector[key] = true;
          break;
        case '$false':
          payload.selector[key] = {
            $or: [{ $exists: false }, { key: false }],
          };
          break;
        case '$!exist':
          payload.selector[key] = { $exists: false };
          break;
        case '$exist':
          payload.selector[key] = { $exists: true };
          break;
        default:
          break;
      }
    });
  }

  return payload;
}
