package gw.fest

uses org.fest.assertions.Condition

enhancement EntityListAssertBaseEnhancement<B extends gw.pl.persistence.core.Bean, A extends EntityListAssertBase<B,A>> : gw.fest.EntityListAssertBase<B,A> {
  
  function allSatisfy(condition : block(bean : B) : boolean) : A {
    return this.allSatisfy(blockToCondition(condition))
  }
  
  function noneSatisfy(condition : block(bean : B) : boolean) : A {
    return this.noneSatisfy(blockToCondition(condition))
  }
  
  function onlyOneSatisfies(condition : block(bean : B) : boolean) : A {
    return this.onlyOneSatisfies(blockToCondition(condition))
  }
  
  function filter(condition : block(bean : B) : boolean) : A {
    return this.filter(blockToCondition(condition))
  }
  
  function pick(condition : block(bean : B) : boolean) : A {
    return this.pick(blockToCondition(condition))
  }
  
  private function blockToCondition(condition : block(bean : B) : boolean) : Condition<B> {
    return new org.fest.assertions.Condition<B>(condition as String) {
      override function matches(value : B) : boolean  {
        return condition(value)
      }
    }
  }
}
