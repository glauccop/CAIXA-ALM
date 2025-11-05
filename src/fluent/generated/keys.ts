import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '0db14774b9ff4ac6be4543280b282d71'
                    }
                    'hist-001': {
                        table: 'x_snc_almcaixa_historias_usuario'
                        id: 'c23b8160d08e47edaa13f8b6da1d3919'
                        deleted: true
                    }
                    'hist-002': {
                        table: 'x_snc_almcaixa_historias_usuario'
                        id: '9acdaf487a9945fe891ec3aded0c7f7b'
                        deleted: true
                    }
                    'hist-003': {
                        table: 'x_snc_almcaixa_historias_usuario'
                        id: '1292efbec3aa48c0ae18b2b6162c5ee8'
                        deleted: true
                    }
                    'hist-004': {
                        table: 'x_snc_almcaixa_historias_usuario'
                        id: '7450a6fda3ab4335a1272ff4e65897d3'
                        deleted: true
                    }
                    'hist-005': {
                        table: 'x_snc_almcaixa_historias_usuario'
                        id: '19fa7c0627fc41d6bfa61f33e7c33324'
                        deleted: true
                    }
                    historia_usuario_001: {
                        table: 'x_snc_almcaixa_historias_usuario'
                        id: '17e73e83bca64b82a0fb69c0b048a7d6'
                    }
                    historia_usuario_002: {
                        table: 'x_snc_almcaixa_historias_usuario'
                        id: 'a24d3ce853bd4053a2e4cb662889f81e'
                    }
                    historia_usuario_003: {
                        table: 'x_snc_almcaixa_historias_usuario'
                        id: '5de2441e39b3480eba8af047fcddd3d9'
                    }
                    historia_usuario_004: {
                        table: 'x_snc_almcaixa_historias_usuario'
                        id: '346453985a9d429ea89129bcb748c79f'
                    }
                    historia_usuario_005: {
                        table: 'x_snc_almcaixa_historias_usuario'
                        id: '4f6dcab97c57417688a7909abd9876a9'
                    }
                    'incident-manager-page': {
                        table: 'sys_ui_page'
                        id: 'c699e549fb634f0fb11502112c93c373'
                    }
                    'nec-001': {
                        table: 'x_snc_almcaixa_necessidades'
                        id: '0a1c2182387e48dca90e2e1a0dd4928c'
                        deleted: true
                    }
                    'nec-002': {
                        table: 'x_snc_almcaixa_necessidades'
                        id: '0a5d0491b6f74182b1a3fce8f816632f'
                        deleted: true
                    }
                    'nec-003': {
                        table: 'x_snc_almcaixa_necessidades'
                        id: '00b4ed902de04d128ba35aa967575987'
                        deleted: true
                    }
                    'nec-004': {
                        table: 'x_snc_almcaixa_necessidades'
                        id: '55991da2d452414aa559ca8c36c74efd'
                        deleted: true
                    }
                    necessidade_001: {
                        table: 'x_snc_almcaixa_necessidades'
                        id: '9aa62b1f5a714abc86928d0847d6aa3a'
                    }
                    necessidade_002: {
                        table: 'x_snc_almcaixa_necessidades'
                        id: 'd987c0d7580b4c1c964001f4dcb2070e'
                    }
                    necessidade_003: {
                        table: 'x_snc_almcaixa_necessidades'
                        id: 'c5dd5d087f0e43ec97efda6c2a4d1e61'
                    }
                    necessidade_004: {
                        table: 'x_snc_almcaixa_necessidades'
                        id: 'b2a9179c356443bf80fab2984943081f'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'de0600782a384f3893e7d0c180f365de'
                    }
                    'plan-001': {
                        table: 'x_snc_almcaixa_planos_teste'
                        id: 'd0cdffafd2d641dc859c2f9677e8bb6c'
                    }
                    'plan-002': {
                        table: 'x_snc_almcaixa_planos_teste'
                        id: 'be99da89103242d092af9cffad1b7e86'
                    }
                    'plan-003': {
                        table: 'x_snc_almcaixa_planos_teste'
                        id: '20c70eede203410ca94350586f1407e8'
                    }
                    'plan-004': {
                        table: 'x_snc_almcaixa_planos_teste'
                        id: 'eda1579e45344eb189a950ef3b1332d5'
                    }
                    'plan-005': {
                        table: 'x_snc_almcaixa_planos_teste'
                        id: '5aad99d6503d4c8fbd3269af0fc94d36'
                    }
                    'req-001': {
                        table: 'x_snc_almcaixa_requisitos'
                        id: 'b4e01a684f8943638c7d72f4e021fd93'
                        deleted: true
                    }
                    'req-002': {
                        table: 'x_snc_almcaixa_requisitos'
                        id: '877802d5c21746a7b548674489ca53ad'
                        deleted: true
                    }
                    'req-003': {
                        table: 'x_snc_almcaixa_requisitos'
                        id: '170c8a25f4494bce9c60190401c40953'
                        deleted: true
                    }
                    'req-004': {
                        table: 'x_snc_almcaixa_requisitos'
                        id: '71486eac2b294356947e92e67a2961b5'
                        deleted: true
                    }
                    'req-005': {
                        table: 'x_snc_almcaixa_requisitos'
                        id: '54a03b8ce0904d03a644fe65ff9e10c6'
                        deleted: true
                    }
                    'req-006': {
                        table: 'x_snc_almcaixa_requisitos'
                        id: 'ac66d9e519674729bddec12c6009c462'
                        deleted: true
                    }
                    requisito_001: {
                        table: 'x_snc_almcaixa_requisitos'
                        id: 'f91069e43a2e47e29044900c8b8c7331'
                    }
                    requisito_002: {
                        table: 'x_snc_almcaixa_requisitos'
                        id: '068fa9c9b6d0472582475a7bc3c84c52'
                    }
                    requisito_003: {
                        table: 'x_snc_almcaixa_requisitos'
                        id: '4514aed3461545c095aa37250cf5c965'
                    }
                    requisito_004: {
                        table: 'x_snc_almcaixa_requisitos'
                        id: 'd6405d214337459fa3cbe95e04592844'
                    }
                    requisito_005: {
                        table: 'x_snc_almcaixa_requisitos'
                        id: 'e19979d3cf654477b34d5ea6d77dec9a'
                    }
                    requisito_006: {
                        table: 'x_snc_almcaixa_requisitos'
                        id: '71ee1f2bc9064bdfb967bde8eda3ddf9'
                    }
                    'requisitos-manager-page': {
                        table: 'sys_ui_page'
                        id: '637f718a2ab54f8bb76e53bbf94bf732'
                    }
                    'x_snc_almcaixa/____insertStyle-BxBLo9PM': {
                        table: 'sys_ux_lib_asset'
                        id: '5f43d3f71fbe45d3b13260cd695fb9e3'
                    }
                    'x_snc_almcaixa/____insertStyle-BxBLo9PM.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: '36a9b9d683584c049b273e2abad3b2ed'
                    }
                    'x_snc_almcaixa/main': {
                        table: 'sys_ux_lib_asset'
                        id: '7551291ebf554585a8b68a8bc91b6a1f'
                    }
                    'x_snc_almcaixa/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: '4dd39dbd73464d7ab736e33bcee31aec'
                    }
                    'x_snc_almcaixa/requisitos-main': {
                        table: 'sys_ux_lib_asset'
                        id: '53570fbe807843bb98b7b8393b78ab86'
                    }
                    'x_snc_almcaixa/requisitos-main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: '869c4f7f7d904f42a28d15d553b7220b'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '0024f3fd47d1462aa429e045b8e73962'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'titulo'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '01e89eb17c4a4a34a98b1a1ab50c9934'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'tipo'
                            value: 'nao_funcional'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '067276d38a5a4340ba744b62c90c6a00'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'numero'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '067f5a4f887044f3b039aba7bbf85446'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0843d25552da4eca8e0417ffbc631d41'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'prioridade'
                            value: 'critica'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '09a64e70fd514f7792010434c9a90d8f'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'prioridade'
                            value: 'baixa'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0bcdbbbf43d341089b078a03f787a2f9'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'numero'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '0c5d124990f74361b2e879c5ef60b559'
                        key: {
                            category: 'x_snc_almcaixa_requisitos'
                            prefix: 'REQ'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0d521dd435e34e43a4995e76d65b319e'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'codigo'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0d5870f10ddd41c19c969df2ba7da8a5'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '163e39ec8c7044e3991f0cf5aa716af0'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'criterios_aceitacao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1977ea33e14347d7bd83cf981ee40256'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'codigo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1c33925374df4dc7aa53795347826f4a'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'prioridade'
                            value: 'alta'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1caff4ccd799457cb5544dac6665622e'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'prioridade'
                            value: 'media'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1ecf3d0db1ed4575bd75f25c82cf9328'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'status'
                            value: 'on_hold'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1fc3618461b846e889aa75cc4d96e974'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'prioridade'
                            value: 'critica'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '20709dc68a4e4bf09802e7c1982401cd'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'status'
                            value: 'aprovado'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '24f9e7a31a1b4dfe9177d6d86d2b80fe'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'status'
                            value: 'rascunho'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '287870e5be0b4ec28cd5cc9c74480c1e'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2bc15313b05f44e78f0d5b75ab4f383b'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'descricao'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2d7344db530042e1a41d065776f057d3'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'requisito_relacionado'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2dbd06788ebf433080fb355876aa6438'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'titulo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3008b94de05f49bda272fe973855f59e'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'status'
                            value: 'em_execucao'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3327d3e3d755486b8cb253cb27365516'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'persona'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '33dbad59ba3941d790492d1e21957fb4'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'beneficio'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '347ac82764584f94b49d9197545ac08b'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'tipo'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '377c5450245b41afa2e68d7fdb01184b'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '39ef2c1c81154fe1b1219d77c09acc09'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'status'
                            value: 'em_andamento'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3abd2f7abaab4feea605512f51d3bf47'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'descricao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '3faa435916ee4c078a0833d26624e59f'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '410fd64f2d6a4804919f0869f7656678'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'status'
                            value: 'planejado'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4193b8ad33cf4166ab5f6810fac608d5'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'prioridade'
                            value: 'baixa'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '46e89ba4f557433fa5499f582e9930ea'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '46ee11edcb0b46a7b6bbce3418f7ebc8'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'tipo'
                            value: 'funcional'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4891fdad058040c8bd9dfc9342cea65e'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'titulo'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '48e5564aebd54cad820f93231a7a6787'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4953c6e613e745818e3bbea0871c85c4'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'titulo'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4a8e05d0785d4a77bf09fc64bfbd363d'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'data_atualizacao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4c84868c05174af4b361f4184ec09fcf'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'data_criacao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4dfe2bc4490e403582d709e63062b4b5'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'pre_condicoes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '52ec07cd7080478db08003074ed89785'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'prioridade'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5746f3a96da942139c3030c9db51ba89'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'data_atualizacao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '59bfb300d6dd4ab9a5fba162f30a747c'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '59ee1a974441443e946c08406a287065'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'status'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5b86b750f0ca4d15af099c33b7d74fdc'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'descricao'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5de5a606887742b3b38314170ebd7b7b'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'data_execucao'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5e2f0ed615c540a3992020eecd1107ea'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5eecce2fed494cc8b2cb347377a0d1f9'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5f2ed587ac4f4e14b13da722971d2015'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'status'
                            value: 'concluida'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '614770caf2424565ada11ad22f48a50a'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '627966b1ff24444dace9839e63665bd1'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'acao_desejada'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '63228119a987405abc8e7ceb4f19bfeb'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'data_criacao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '6688a2b6b68e4fdf81ad43d82d76f229'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '678e3c178d3f415fb5af4f0c08f82fc1'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '67e1df0fc93d4c9693bbd03b83fef5a6'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'status'
                            value: 'rejeitado'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '698825c5f1bd4552906a2d17ef976228'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'prioridade'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6aa1580c4a1b4c33be5d854ad424af22'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'resultado_esperado'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6afca4e368b54b409e50dd14e9311e53'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'prioridade'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6b63e3308b0c45448f5694897c06311c'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'data_execucao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6cb8156bf2bf483dbec5deb25a9b9d13'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'passos_teste'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6da42ffdcabc422789cf3e686cba98bb'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '6f7e392215864a898b32225402717ca8'
                        key: {
                            category: 'x_snc_almcaixa_necessidades'
                            prefix: 'NEC'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '6faac111460f4080ab764e6daec1e359'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '70128a6e0acd4ddc88cfd09839bae54a'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'prioridade'
                            value: 'critica'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7140b93e60474a9f84e92a32478ad4f1'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'prioridade'
                            value: 'baixa'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7461b9e9862b4a2dbb36effe73d05381'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'prioridade'
                            value: 'baixa'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '7510cf9f68c24ff1a37cb7336836e848'
                        key: {
                            category: 'x_snc_almcaixa_historias_usuario'
                            prefix: 'STY'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7546ec5cb4a846d7b88a009d9e56116f'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'prioridade'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '75b1bde5929c43388b3bc06b1bc0bb03'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'necessidade_relacionada'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '75d48b031b8d41348787c00a1342dd68'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'prioridade'
                            value: 'alta'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '75f1cfd507914217a44c03e4cad9e821'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'tipo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7632c227a1af458a96a87e5b53c68940'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'status'
                            value: 'new'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '769bf7210a6e4295a6138839b3c1cabe'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'prioridade'
                            value: 'media'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '779ad40ad21f4fdb9136b0958e466248'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'pre_condicoes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '77a6a73670e0448c8b8b7b8cc8cf687c'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'status'
                            value: 'em_desenvolvimento'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '77d29b1364624f0b9769be885d4612b7'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'codigo'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '79ba845c3cbc4144bdc1154078f24d0f'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'beneficio'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7c283cb4b2744e0e824447f151d8846a'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'necessidade_relacionada'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7c422e5e626846cabf1ad59f02693a7a'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'data_identificacao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7ce4a52b3afa4369aabb4bbcebbb368a'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'status'
                            value: 'passou'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7d7f45274d504e3bb14d535aa2fa1645'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'data_criacao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '82409620afa64d809528c10f7fd8f020'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'status'
                            value: 'testado'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '82b74d578fdb4ca2b701bdce98ebd916'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '82f9db3b6a3141869c6bd5c430f92afb'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'passos_teste'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8572da0191864e3abce9909b3d12dfa8'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'data_criacao'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '881c64e569fd44d3b5eee9ecb4d91982'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8821bc6f33444ab48132930aef1daae0'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'historia_relacionada'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '89bf3ad4a21a4eddbacabc3159810863'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'prioridade'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f2850848c874a3197c536bd32296091'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'resolved_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '92e6070ede874e6e8161fd6a80e89009'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'data_criacao'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '944eef3e6f7a4fb58027f9d1cad044b2'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'prioridade'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '96e6b367f1264bb38e029f1e62429a13'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '972127b46ebc483981d185f0461b8e24'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'status'
                            value: 'resolved'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '988aefd10d4c411abf9f826eaf58bb63'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'status'
                            value: 'identificada'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9942f7c4008c4dcabc898e19629c1b57'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'prioridade'
                            value: 'media'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '996dcfe714034284a51f21d292dd0dae'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'data_identificacao'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9c8d525144db41d6949d055cd53641a0'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'descricao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d7934722df84f8eb28bbc48bb08a652'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'resultado_esperado'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9f380792786845019f726bab626b8d0f'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'opened_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a04be156bf474032b8ce928a3d2e9c7a'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'descricao'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a09d773f5fa2445e9e2ec7e348199d71'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'codigo'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a16eefea622e46d297b1f3ddce919205'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'status'
                            value: 'aprovada'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a288f72532cd460892d520b1834fc1a2'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'priority'
                            value: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a3457991147b4e73bb6eb9dd46b56074'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'titulo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a48c23976b7840adbd7c5be2f9ce42eb'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'prioridade'
                            value: 'critica'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a50d423c5b764b289a47633d02cc0c97'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a7001f0c068f4c26a524bf143064edbc'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'titulo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a9d528d3aa254e1d9186bfa7f10c5cd5'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'prioridade'
                            value: 'alta'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'aac7c51d75a74e39883f087e81ff89a3'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'status'
                            value: 'cancelada'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aaedafb7a4ce4624b8dfb4613d3feece'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'number'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'aba18850fd5d4960b82a405bfa2b1375'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'ac82953af51042899cd2071b215de625'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ad534fcfa208415587acd75d00c0c741'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b1b717f0623c49f8bf60d18ef9d40b59'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'criterios_aceitacao'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b56e9104c5274b85b1db419936091354'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'numero'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b72d8c302e7f405dad234f53408dcf58'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'data_atualizacao'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'bb19a365148249da9aff594fc3a8502a'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bc4ca42ee900410f84fbd70d835a060b'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'status'
                            value: 'bloqueado'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bde306b8acbe4ef5af2de12ece592f85'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'numero'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'c0c78378b8b54c31b3b42cfe5d0a633f'
                        key: {
                            category: 'x_snc_almcaixa_incident'
                            prefix: 'INC'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c102db9b5c5049f082f4facccb6403f8'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c32e2993d89743d8963349a6d5c7f1a5'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'data_atualizacao'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c6bec184d8ab4fee88bf24b94a2589fe'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c6f8ed0a056640de97b36c3e5152105a'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'codigo'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c77c6792bae24e61be284ed75e4d10a8'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'priority'
                            value: '4'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c95a956d971e4c7a922e1e7b033e57e4'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'status'
                            value: 'em_revisao'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ccdbaae599c641449c4323122bfd1a4e'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'opened_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cf3fdafbe78b48beae2b4e28289d8de1'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'historia_relacionada'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd04aa4c7c9214c789db10d85ac051e67'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'numero'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd1058827fb7849c1acf6f4b36a1e25c7'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'prioridade'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd21d4c10477944d88a9209e56c800afa'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'prioridade'
                            value: 'media'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd2238eea81a14ae1b6e6089ef6b8e654'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'status'
                            value: 'falhou'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd4e92e4d9f1a47c3914279eea7645226'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'resolved_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd76fae54ef2849bda6163f3745591a67'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd77529091898402c8df38f87e78d2db7'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'status'
                            value: 'closed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd77628003943470a999cc4caf549f23e'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'status'
                            value: 'em_teste'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'da7fee07a2fa4018a9aa245285ca84e0'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'da8214b472ba4ad191580c0babb750bb'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'data_atualizacao'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'da84ade0d2284de795572a688e601ace'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'status'
                            value: 'em_analise'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dce60ce0ff104f97a56c24834c214408'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'prioridade'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dcffde01dafa49e5942673ea8830dde5'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'deddfa78ea944bd3a179484b597ac8ea'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'short_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dfc1bded6514422a8972ec0602fc8871'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'acao_desejada'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e25314016d834ad48b23ec1d56fbd00e'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'requisito_relacionado'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e52e738e1ad64bf7876e71ce8763cb69'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'numero'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e609bda2fe4e45bc9290ab6d523e8d8c'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'priority'
                            value: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e64e5d6499f44c11946deabe1dba2163'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e6a6927ded1945159b0967a962480cec'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'data_criacao'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e6bfae8c05bb44ee93d8e88ffc3d0a31'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'status'
                            value: 'implementado'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e73bdaec76434d0999368715adeebdef'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'priority'
                            value: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ed9ee6234cfc4f0991f2f1c5015f388f'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'titulo'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ee222d9c3bd1473ca3792ffa0b4282a9'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'data_atualizacao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ef2f8db9d08549d78011abc5b464c39b'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'status'
                            value: 'concluida'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'efa4c90bc5cf461dba6e3931ed15eafb'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f00a7214c8104f93a83b6664665d9f34'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'persona'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f00e75a4d4eb46668ccff9eaab7c9e2e'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'f1438009a7ad47109e9f082d59eccc9b'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f26972b43b2541fabf2ef1553bf571f7'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'codigo'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f336ed36a1854631884871a3d69c3728'
                        key: {
                            name: 'x_snc_almcaixa_incident'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f3cf41a0e1064b50af3fd0bdc4c003d5'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f4cc32abd753414eab356a5b45929f1e'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f6156614aece4db382391be95a880ea8'
                        key: {
                            name: 'x_snc_almcaixa_planos_teste'
                            element: 'descricao'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f65df4d066624dffb942f441263d45e4'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'prioridade'
                            value: 'alta'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fa219a213e2244d7b26092e6d149ad4f'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fbd2a7177ce4491e8293f308417b720e'
                        key: {
                            name: 'x_snc_almcaixa_historias_usuario'
                            element: 'status'
                            value: 'nova'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fdc6c2bce85644fb89d1eea995478378'
                        key: {
                            name: 'x_snc_almcaixa_necessidades'
                            element: 'status'
                            value: 'rejeitada'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fe7820c6dfd344e4b2cc9bc8de9a21f7'
                        key: {
                            name: 'x_snc_almcaixa_requisitos'
                            element: 'titulo'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
