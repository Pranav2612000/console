<script lang="ts">
    import { InputDateTime } from '$lib/elements/forms';
    import type { Models } from '@aw-labs/appwrite-console';

    export let id: string;
    export let label: string;
    export let value: string;
    export let attribute: Models.AttributeDatetime;
    export let optionalText: string | undefined = undefined;
</script>

<InputDateTime
    {id}
    {label}
    {optionalText}
    showLabel={!!label?.length}
    required={attribute.required}
    bind:value />
