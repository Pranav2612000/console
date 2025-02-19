import { Dependencies } from '$lib/constants';
import { sdkForConsole } from '$lib/stores/sdk';
import Breadcrumbs from './breadcrumbs.svelte';
import Header from './header.svelte';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ params, depends }) => {
    depends(Dependencies.WEBHOOK);

    try {
        return {
            header: Header,
            breadcrumbs: Breadcrumbs,
            webhook: await sdkForConsole.projects.getWebhook(params.project, params.webhook)
        };
    } catch (e) {
        throw error(e.code, e.message);
    }
};
