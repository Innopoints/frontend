import re
from subprocess import run


SASS_PATH = 'sass'
POSTCSS_PATH = 'postcss'


common = [
    'global/normalize',
    'global/common',
    'global/ui-kit',
]

layout_default = [
    'page-components/header',
    'page-components/notification-center',
    'page-components/empty-state',
    'page-components/footer',
]

styles = {
    'home': [
        'home/header',
        'home/main',
        'home/tagline',
        'home/how-to',
        'home/contacts',
        'home/options',
        'home/store',
        'page-components/empty-state',
        'page-components/notification-center',
        'page-components/footer',
    ],
    '_error': [
        'page-components/404',
        'page-components/403',
    ],
    'dashboard': [
        'admin-dashboard/main',
    ],
    'profile': [
        'profile/quick-info',
        'profile/main-card',
        'profile/timeline',
        'profile/leave-feedback-modal',
        'profile/export-data-modal',
        'profile/statistics',
        'profile/bar-colors',
        'profile/notifications',
        'page-components/modal-dialog',
    ],
    'store': [
        'page-components/tagline',
        'page-components/filters',
        'store/filters-spec',
        'store/main',
        'page-components/pagination',
    ],
    'products_new': [
        'create-product/main',
        'create-product/preview-card',
        'page-components/modal-dialog',
    ],
    'products_id': [
        'view-product/main',
        'page-components/modal-dialog',
    ],
    'products_id_edit': [
        'create-product/main',
        'create-product/preview-card',
        'page-components/modal-dialog',
    ],
    'projects': [
        'page-components/tagline',
        'page-components/filters',
        'projects/filters-spec',
        'projects/main',
    ],
    'projects_new': [
        'create-project/steps',
        'create-project/main',
        'create-project/general',
        'create-project/activity',
        'create-project/actions',
        'page-components/create-activity',
        'page-components/modal-dialog',
    ],
    'projects_past': [
        'page-components/tagline',
        'page-components/filters',
        'projects/filters-spec',
        'projects/main',
    ],
    'projects_id': [
        'view-project/main',
        'view-project/activity',
        'view-project/activity-user',
        'view-project/activity-moderated',
        'view-project/activity-finalizing',
        'review-project/main',
        'page-components/create-activity',
        'view-project/moderators',
        'view-project/proper-grid',
        'view-project/report-performance-modal',
        'view-project/read-feedback-modal',
        'profile/leave-feedback-modal',
        'view-project/apply-modal',
        'page-components/modal-dialog',
    ],
    'projects_id_edit': [
        'create-project/steps',
        'create-project/main',
        'create-project/general',
        'create-project/activity',
        'create-project/actions',
        'edit-project/main',
        'page-components/create-activity',
    ],
    'projects_id_review': [
        'view-project/main',
        'view-project/activity',
        'view-project/activity-moderated',
        'view-project/activity-finalizing',
        'review-project/main',
        'view-project/moderators',
        'page-components/modal-dialog',
    ],
}

def build_bundle(contents, output):
    '''Build a minified CSS bundle at path `output` from the files listed in `contents`.'''
    sass_bundled = ''
    for file in contents:
        with open(f'static/css/{file}.scss') as sass_file:
            sass_bundled += sass_file.read() + '\n'

    sass_bundled = re.sub('@import "[^"]+";', '', sass_bundled)
    sass_bundled = (
        '@import "static/css/global/_mixins.scss";\n'
        + '@import "static/css/global/_variables.scss";\n'
        + sass_bundled
    )

    run([SASS_PATH, '--stdin', output, '-s', 'compressed', '--no-source-map'],
        input=sass_bundled,
        text=True,
        check=True)

    run([POSTCSS_PATH, output, '--use', 'autoprefixer', '--no-map', '-r'],
        input=sass_bundled,
        text=True)


def get_all_bundles():
    bundle_fmt = 'static/css/bundles/{}.min.css'

    build_bundle(common, bundle_fmt.format('common'))

    build_bundle(layout_default, bundle_fmt.format('layout-default'))

    for page in styles:
        build_bundle(styles[page], bundle_fmt.format(page.replace('_', '-')))

if __name__ == '__main__':
    get_all_bundles()
