import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UniqueIdInput {
	@Field(_ => ID)
	id: string;
}