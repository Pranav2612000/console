<script lang="ts">
    import { invalidate } from '$app/navigation';
    import { Submit, trackError, trackEvent } from '$lib/actions/analytics';
    import { CardGrid, Heading } from '$lib/components';
    import { Dependencies } from '$lib/constants';
    import { Pill } from '$lib/elements';
    import { Button } from '$lib/elements/forms';
    import { clickOnEnter } from '$lib/helpers/a11y';
    import { addNotification } from '$lib/stores/notifications';
    import { sdkForConsole } from '$lib/stores/sdk';
    import { project } from '../../store';

    const projectId = $project.$id;

    let isLimited = $project.authLimit !== 0;
    let newLimit = isLimited ? $project.authLimit : 100;
    let submitting = false;

    $: btnDisabled = (function isBtnDisabled() {
        if (
            submitting ||
            (!isLimited && $project.authLimit === 0) ||
            (isLimited && $project.authLimit === newLimit)
        ) {
            return true;
        }

        return false;
    })();

    async function updateLimit() {
        submitting = true;
        try {
            await sdkForConsole.projects.updateAuthLimit(projectId, isLimited ? newLimit : 0);
            invalidate(Dependencies.PROJECT).then(() => (submitting = false));
            addNotification({
                type: 'success',
                message: 'Updated project users limit successfully'
            });
            trackEvent(Submit.AuthLimitUpdate);
        } catch (error) {
            addNotification({
                type: 'error',
                message: error.message
            });
            submitting = false;
            trackError(error, Submit.AuthLimitUpdate);
        }
    }
</script>

<CardGrid>
    <Heading tag="h2" size="6">Users Limit</Heading>
    <p>
        Limit new users from signing up for your project, regardless of authentication method. You
        can still create users and team memberships from your Appwrite console.
        <b>The maximum limit is 10,000 users.</b>
    </p>

    <svelte:fragment slot="aside">
        <ul class="form-list">
            <li class="form-item">
                <label class="choice-item" for="unlimited">
                    <input
                        id="unlimited"
                        name="authLimit"
                        class="u-cross-child-center"
                        required
                        type="radio"
                        bind:group={isLimited}
                        value={false} />
                    <div class="choice-item-content  u-cross-child-center">
                        <div class="choice-item-title">Unlimited</div>
                    </div>
                    <Pill>recommended</Pill>
                </label>
            </li>
            <li class="form-item is-multiple">
                <div class="input-text-wrapper">
                    <label class="choice-item" for="limited">
                        <input
                            id="limited"
                            name="authLimit"
                            required
                            type="radio"
                            bind:group={isLimited}
                            value={true} />
                        <div class="choice-item-content">
                            <div class="choice-item-title">Limited</div>
                        </div>
                    </label>
                </div>
                <div
                    class="input-text-wrapper u-stretch"
                    on:click={() => (isLimited = true)}
                    on:keyup|self={clickOnEnter}>
                    <input
                        type="number"
                        name="limit"
                        id="limit"
                        class="input-text"
                        max="10000"
                        disabled={!isLimited}
                        bind:value={newLimit} />
                </div>
            </li>
        </ul>
    </svelte:fragment>

    <svelte:fragment slot="actions">
        <Button
            disabled={btnDisabled}
            on:click={() => {
                updateLimit();
            }}>Update</Button>
    </svelte:fragment>
</CardGrid>
