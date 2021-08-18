package gw.testharness

uses com.guidewire.testharness.assertion.BaseAssert
uses org.fest.assertions.Condition

enhancement BaseAssertEnhancement<T, A extends BaseAssert<T, A>> : BaseAssert<T, A> {
  
  function satisfies(condition : block(t : T) : boolean) : A {
    return this.satisfies(blockToCondition(condition))
  }
  
  function doesNotSatisfy(condition : block(t : T) : boolean) : A {
    return this.doesNotSatisfy(blockToCondition(condition))
  }
  
  function is(condition : block(t : T) : boolean) : A {
    return this.is(blockToCondition(condition))
  }
  
  function isNot(condition : block(t : T) : boolean) : A {
    return this.isNot(blockToCondition(condition))
  }
  
  private function blockToCondition(condition : block(t : T) : boolean) : Condition<T> {
    return new Condition<T>(condition as String) {
      override function matches(value : T) : boolean  {
        return condition(value)
      }
    }
  }
}
