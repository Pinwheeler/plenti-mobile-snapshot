import { DateTime } from "luxon";
import { ChatMessageSendForm } from "../forms/ChatMessageSendForm";
import { AccountEntity } from "./Account";

export class ChatMessageEntity {
  id?: number;
  toAccountId: string;
  fromAccountId: string;
  text: string;
  sentDate: DateTime;
  read: boolean;

  static chatMessageRegex = /^(\d*)::(\d*)::(.*)::(.*)$/;
  static isChatMessage(value: string): boolean {
    return ChatMessageEntity.chatMessageRegex.test(value);
  }

  constructor(
    toAccountId: string,
    fromAccountId: string,
    text: string,
    sentDate: DateTime,
    messageId?: number,
    read: boolean = false
  ) {
    this.id = messageId;
    this.toAccountId = toAccountId;
    this.fromAccountId = fromAccountId;
    this.text = text;
    this.sentDate = sentDate;
    this.read = read;
  }

  static fromSendForm(
    form: ChatMessageSendForm,
    fromAccount: AccountEntity
  ): ChatMessageEntity {
    const date = DateTime.now();
    const entity = new ChatMessageEntity(
      form.recipientAccountId,
      fromAccount.id,
      form.text,
      date,
      undefined,
      true
    );
    return entity;
  }

  static fromModel(model: ChatMessageModel): ChatMessageEntity {
    const date = DateTime.fromFormat(
      model.sentDate,
      "YYYY-MM-DD[T]HH:mm:ss.SSSZZ"
    );
    const entity = new ChatMessageEntity(
      model.toAccountId,
      model.fromAccountId,
      model.text,
      date,
      model.id,
      model.read
    );
    return entity;
  }

  static fromString(chatString: string): ChatMessageEntity {
    const result = ChatMessageEntity.chatMessageRegex.exec(chatString);
    if (!result) {
      throw new Error("not a chat message");
    }
    const model: ChatMessageModel = {
      fromAccountId: result[1] ?? "0",
      toAccountId: result[2] ?? "0",
      sentDate: result[3],
      text: result[4],
      read: false,
    };
    return this.fromModel(model);
  }

  socketString = () =>
    `${this.fromAccountId}::${this.toAccountId}::${this.sentDate.toFormat(
      "YYYY-MM-DD[T]HH:mm:ss.SSSZZ"
    )}::${this.text}`;
}

export interface ChatMessageModel {
  id?: number;
  toAccountId: string;
  fromAccountId: string;
  text: string;
  sentDate: string;
  read: boolean;
}
