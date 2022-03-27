import { ChatMessageEntity, ChatMessageModel } from "../ChatMessage";

describe("ChatMessage", () => {
  it("can be sythesized from a model", () => {
    const model: ChatMessageModel = {
      id: 1,
      toAccountId: 1,
      fromAccountId: 2,
      text: "Hello World",
      sentDate: "2019-10-17T03:06:15.916+0000",
      read: false,
    };
    const subject = ChatMessageEntity.fromModel(model);
    expect(subject.id).toBe(1);
    expect(subject.toAccountId).toBe(1);
    expect(subject.fromAccountId).toBe(2);
    expect(subject.text).toBe("Hello World");
    expect(subject.sentDate.valueOf()).toBe(1571281575916);
  });

  it("can be synthesized from a string", () => {
    const subject = ChatMessageEntity.fromString(
      "2::3::4::2019-10-16T20:06:15.916-0700::Hello, World!"
    );
    expect(subject.id).toBeUndefined();
    expect(subject.toAccountId).toBe(3);
    expect(subject.fromAccountId).toBe(2);
    expect(subject.text).toBe("Hello, World!");
    expect(subject.sentDate.valueOf()).toEqual(-62015921624084);

    expect(subject.socketString()).toBe(
      "2::3::0004-10-16T19:13:17.916-0745::Hello, World!"
    );
  });

  it("can tell when a message is a chat message", () => {
    expect(
      ChatMessageEntity.isChatMessage(
        "2::3::4::2019-10-16T20:06:15.916-0700::Hello, World!"
      )
    ).toBe(true);

    expect(
      ChatMessageEntity.isChatMessage(
        "2``3``4``2019-10-16T20:06:15.916-07:00``shareLocation"
      )
    ).toBe(false);
  });
});
