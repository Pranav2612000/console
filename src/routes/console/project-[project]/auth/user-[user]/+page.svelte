<script lang="ts">
    import { Container } from '$lib/layout';
    import DangerZone from './dangerZone.svelte';
    import UpdateEmail from './updateEmail.svelte';
    import UpdateName from './updateName.svelte';
    import UpdatePassword from './updatePassword.svelte';
    import UpdatePhone from './updatePhone.svelte';
    import UpdatePrefs from './updatePrefs.svelte';
    import UpdateStatus from './updateStatus.svelte';
</script>

<Container>
    <UpdateStatus />
    <UpdateName />
    <UpdateEmail />
    <UpdatePhone />
    <UpdatePassword />
    <UpdatePrefs />
    <DangerZone />
</Container>
