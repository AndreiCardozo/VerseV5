import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import outrosData from '../../assets/outros/outros.json';
import styles from './Outros.module.css';
import { Button } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Footer } from '../../components/Footer';

export function Outros({ carrinho, setCarrinho }) {
    const [outros, setOutros] = useState([]);
    const [detalhesVisible, setDetalhesVisible] = useState(false);
    const [detalhesOutro, setDetalhesOutro] = useState(null);

    useEffect(() => {
        setOutros(outrosData.outros);
    }, []);

    const adicionarAoCarrinho = (outro) => {
        const itemExistente = carrinho.find((item) => item.nome === outro.NomeOutros);
        if (itemExistente) {
            const novoCarrinho = carrinho.map((item) => {
                if (item.nome === outro.NomeOutros) {
                    return {
                        ...item,
                        quantidade: item.quantidade + 1,
                    };
                }
                return item;
            });
            setCarrinho(novoCarrinho);
        } else {
            const novoCarrinho = [
                ...carrinho,
                {
                    id: outro.NomeOutros,
                    nome: outro.NomeOutros,
                    preco: outro.PrecoOutros,
                    quantidade: 1,
                },
            ];
            setCarrinho(novoCarrinho);
        }
    };

    const exibirDetalhes = (outro) => {
        setDetalhesOutro(outro);
        setDetalhesVisible(true);
    };

    const fecharDetalhes = () => {
        setDetalhesVisible(false);
        setDetalhesOutro(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.container}>


                <Header />

                <div className={styles.outrosGrid}>
                    {outros.map((outro) => (
                        <div key={outro.NomeOutros} className={styles.outroItem}>
                            <h2>{outro.NomeOutros}</h2>
                            <img src={outro.ImgOutros} alt={outro.NomeOutros} className={styles.motoImage} />
                            <p>Preço: R${outro.PrecoOutros}</p>
                            <div className={styles.buttonsContainer}>
                                <Button colorScheme="green" className={styles.doarButton} onClick={() => adicionarAoCarrinho(outros)}>
                                    Adicionar ao carrinho
                                </Button>
                                <Button colorScheme="blue" className={styles.detalhesButton} onClick={() => exibirDetalhes(outros)}>
                                    ?
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal isOpen={detalhesVisible} onClose={fecharDetalhes} size="md">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{detalhesOutro?.NomeOutros}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>Descrição: {detalhesOutro?.DescOutros}</p>
                            <p>Preço: R${detalhesOutro?.PrecoOutros}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={fecharDetalhes}>
                                Fechar
                            </Button>
                            <Button colorScheme="green" onClick={() => adicionarAoCarrinho(detalhesOutro)}>
                                Adicionar ao Carrinho
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
            <div className={styles.footer}>
            <Footer />
            </div>
        </div>
    );
}
