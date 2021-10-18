import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    // @ts-ignore
    const component = create(<ProfileStatus status = "I'm samurai" />);
    const instance = component.root
    expect(instance?.props.status).toBe('I\'m samurai');
  });

  test("after creation span should be show", () => {
    // @ts-ignore
    const component = create(<ProfileStatus status = "I'm samurai" />);
    const instance = component.root
    const span = instance.findByType("span");
    expect(span).not.toBeNull();
  });

  test("after creation input should be hide", () => {
    // @ts-ignore
    const component = create(<ProfileStatus status = "I'm samurai" />);
    const instance = component.root
    expect(() => {   const input = instance.findByType("input")}).toThrow();
  });

  test("after onClick button input should be show ", () => {
    // @ts-ignore
    const component = create(<ProfileStatus status = "I'm samurai" isMeProfile={true}/>);
    const instance = component.root
    const span = instance.findByType('span');
    span.props.onDoubleClick()
    const input = instance.findByType("input");
    expect(input).not.toBeNull();
  });
});