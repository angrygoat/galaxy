define("mocha/tests/rules_tests",["chai","mvc/rules/rule-definitions","json-loader!yaml-loader!./rules_dsl_spec.yml"],function(e,s,a){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}function r(e,s,a){var t=[];if(s[0])for(var r in s[0])t.push("new");return i.default.applyRules(s,a,t,e)}function u(e,s){it("should pass conformance test case "+s,function(){if(l.default.assert.property(e,"rules"),e.initial){l.default.assert.property(e,"final");var s=e.rules,a=e.initial,t=e.final,u=r(s,a.data,a.sources),i=u.data,n=u.sources;l.default.assert.deepEqual(i,t.data),void 0!==t.sources&&l.default.assert.deepEqual(n,t.sources)}else l.default.assert(e.error)})}var l=t(e),i=t(s),n=t(a);i.default.RULES;describe("Rules DSL Spec",function(){n.default.forEach(u)})});