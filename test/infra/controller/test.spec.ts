import 'reflect-metadata';
import { container, injectable } from 'tsyringe';

beforeEach(() => {
  container.reset();
  container.clearInstances();
});

interface IToto {
  getName(): string;
}

@injectable()
class Bar {}

@injectable()
class Papa implements IToto {
  getName(): string {
    return 'papa';
  }
}

@injectable()
class Toto implements IToto {
  name: string = 'default';

  //constructor() {
  constructor(name: string, private value: Bar) {
    console.log(`TOTO instance created with name '${name}' and value '${value}'`);
  }

  public getName(): string {
    return this.name;
  }
}

describe('tsyringe bug ?', () => {
  test('constructor with parameters generates typeInfo not known', () => {
    container.registerInstance(Bar, new Bar());
    //container.register<IToto>('ITotot', { useToken: Toto });
    container.register(Toto, { useClass: Toto });
    container.register(Papa, { useClass: Papa });
    container.registerInstance(String, 'toto');

    const papa = container.resolve(Papa);
    const foo = container.resolve<Toto>(Toto);
  });
});