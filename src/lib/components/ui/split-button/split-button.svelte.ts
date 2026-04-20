import { Context } from "runed"
import type { WritableBoxedValues } from "svelte-toolbelt";

type SplitButtonRootProps = WritableBoxedValues<{
    selectedAction: string;
}>

class SplitButtonState {
    constructor(readonly opts: SplitButtonRootProps) {

    }
}

class SplitButtonSelectState {
    constructor(readonly rootState: SplitButtonState) {
    }
}

class SplitButtonButtonState {
    constructor(readonly rootState: SplitButtonState) {
    }
}

const SplitButtonCtx = new Context<SplitButtonState>('split-button-ctx');

export function useSplitButton(props: SplitButtonRootProps) {
    return SplitButtonCtx.set(new SplitButtonState(props));
}

export function useSplitButtonSelect() {
    return new SplitButtonSelectState(SplitButtonCtx.get());
}